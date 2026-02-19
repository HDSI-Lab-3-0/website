import { useState, useEffect } from "react";
import { Select, SelectItem } from "@heroui/react";
import type { CollectionEntry } from "astro:content";
import tagsData from "@/data/tags.json";

interface ProjectFiltersProps {
	onFiltersChange: (
		selectedSchoolLevel: Set<string>,
		selectedLocation: Set<string>,
		selectedType: Set<string>,
		selectedSponsor: Set<string>,
		selectedCost: Set<string>,
		selectedOther: Set<string>
	) => void;
	availableProjects: CollectionEntry<"projects">[];
}

// Categorize tags based on tags.json (same logic as ProjectGrid)
function categorizeTags(projectTags: string[] | undefined) {
	if (!projectTags || projectTags.length === 0) return {};

	const categorized: Record<string, string[]> = {};
	const usedTags = new Set<string>();

	// Check each tag against all categories
	for (const [category, categoryTags] of Object.entries(tagsData.categories)) {
		const matchingTags = projectTags.filter((tag) =>
			categoryTags.some((catTag) => catTag.toLowerCase() === tag.toLowerCase())
		);

		if (matchingTags.length > 0) {
			categorized[category] = matchingTags;
			matchingTags.forEach((tag) => usedTags.add(tag.toLowerCase()));
		}
	}

	// Add remaining tags to "Other" category
	const otherTags = projectTags.filter(
		(tag) => !usedTags.has(tag.toLowerCase())
	);
	if (otherTags.length > 0) {
		categorized["Other"] = otherTags;
	}

	return categorized;
}

// Get all unique tags from available projects, organized by category
function getAvailableTagsByCategory(
	projects: CollectionEntry<"projects">[]
): Record<string, Set<string>> {
	const tagsByCategory: Record<string, Set<string>> = {};

	projects.forEach((project) => {
		const categorized = categorizeTags(project.data.tags);
		Object.entries(categorized).forEach(([category, tags]) => {
			if (!tagsByCategory[category]) {
				tagsByCategory[category] = new Set();
			}
			tags.forEach((tag) => tagsByCategory[category].add(tag));
		});
	});

	return tagsByCategory;
}

const CATEGORY_PRIORITY = [
	"School Level",
	"Location",
	"Type",
	"Sponsor",
	"Cost",
	"Other",
];

export default function ProjectFilters({
	onFiltersChange,
	availableProjects,
}: ProjectFiltersProps) {
	// State for each category
	const [selectedSchoolLevel, setSelectedSchoolLevel] = useState<Set<string>>(
		new Set([])
	);
	const [selectedLocation, setSelectedLocation] = useState<Set<string>>(new Set([]));
	const [selectedType, setSelectedType] = useState<Set<string>>(new Set([]));
	const [selectedSponsor, setSelectedSponsor] = useState<Set<string>>(new Set([]));
	const [selectedCost, setSelectedCost] = useState<Set<string>>(new Set([]));
	const [selectedOther, setSelectedOther] = useState<Set<string>>(new Set([]));

	const availableTagsByCategory = getAvailableTagsByCategory(availableProjects);

	// Trigger callback with all selected sets
	useEffect(() => {
		onFiltersChange(
			selectedSchoolLevel,
			selectedLocation,
			selectedType,
			selectedSponsor,
			selectedCost,
			selectedOther
		);
	}, [
		selectedSchoolLevel,
		selectedLocation,
		selectedType,
		selectedSponsor,
		selectedCost,
		selectedOther,
		onFiltersChange,
	]);

	const hasFilters =
		selectedSchoolLevel.size +
			selectedLocation.size +
			selectedType.size +
			selectedSponsor.size +
			selectedCost.size +
			selectedOther.size >
		0;

	const renderCategoryDropdown = (
		category: string,
		tags: Set<string>,
		selected: Set<string>,
		setSelected: (s: Set<string>) => void
	) => {
		const sortedTags = Array.from(tags)
			.filter((tag) => tag.trim().length > 0)
			.sort((a, b) => a.localeCompare(b));

		if (sortedTags.length === 0) return null;

		return (
			<div key={category} className="filter-select-wrapper">
				<label className="filter-label">{category}</label>
				<Select
					placeholder={`Select ${category.toLowerCase()}...`}
					selectionMode="multiple"
					selectedKeys={selected}
					onSelectionChange={(keys) => setSelected(new Set(keys as Iterable<string>))}
					classNames={{
						base: "w-full",
						trigger: "filter-trigger",
						value: "filter-value",
						selectorIcon: "filter-icon",
						popoverContent: "filter-popover",
					}}
					disallowEmptySelection={false}
				>
					{sortedTags.map((tag) => (
						<SelectItem key={tag} textValue={tag}>
							{tag}
						</SelectItem>
					))}
				</Select>
			</div>
		);
	};

	return (
		<div className="filters-container">
			<div className="filters-header">
				<div className="filters-header-left">
					<h3 className="filters-title">Filters</h3>
					{hasFilters && (
						<button
							onClick={() => {
								setSelectedSchoolLevel(new Set<string>());
								setSelectedLocation(new Set<string>());
								setSelectedType(new Set<string>());
								setSelectedSponsor(new Set<string>());
								setSelectedCost(new Set<string>());
								setSelectedOther(new Set<string>());
							}}
							className="filters-clear"
						>
							Clear all
						</button>
					)}
				</div>
			</div>

			{Object.keys(availableTagsByCategory).length > 0 ? (
				<div className="filters-grid">
					{CATEGORY_PRIORITY.map((category) => {
						const tags = availableTagsByCategory[category];
						if (!tags || tags.size === 0) return null;

						let selected: Set<string>;
						let setSelected: (s: Set<string>) => void;

						switch (category) {
							case "School Level":
								selected = selectedSchoolLevel;
								setSelected = (s: Set<string>) => setSelectedSchoolLevel(s);
								break;
							case "Location":
								selected = selectedLocation;
								setSelected = (s: Set<string>) => setSelectedLocation(s);
								break;
							case "Type":
								selected = selectedType;
								setSelected = (s: Set<string>) => setSelectedType(s);
								break;
							case "Sponsor":
								selected = selectedSponsor;
								setSelected = (s: Set<string>) => setSelectedSponsor(s);
								break;
							case "Cost":
								selected = selectedCost;
								setSelected = (s: Set<string>) => setSelectedCost(s);
								break;
							case "Other":
								selected = selectedOther;
								setSelected = (s: Set<string>) => setSelectedOther(s);
								break;
							default:
								return null;
						}

						return renderCategoryDropdown(category, tags, selected, setSelected);
					})}
				</div>
			) : (
				<div className="filters-empty">
					<p>No project tags available</p>
				</div>
			)}
		</div>
	);
}
