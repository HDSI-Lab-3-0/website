import { useState, useEffect } from "react";
import { Select, SelectItem } from "@heroui/react";
import type { CollectionEntry } from "astro:content";
import tagsData from "@/data/tags.json";

interface ProjectFiltersProps {
	onFiltersChange: (selectedTags: string[]) => void;
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

	// Combine all selected tags and trigger callback
	useEffect(() => {
		const allSelectedTags = [
			...Array.from(selectedSchoolLevel),
			...Array.from(selectedLocation),
			...Array.from(selectedType),
			...Array.from(selectedSponsor),
			...Array.from(selectedCost),
			...Array.from(selectedOther),
		];
		onFiltersChange(allSelectedTags);
	}, [
		selectedSchoolLevel,
		selectedLocation,
		selectedType,
		selectedSponsor,
		selectedCost,
		selectedOther,
		onFiltersChange,
	]);

	const clearCategory = (setter: (s: Set<string>) => Set<string>) => {
		setter(new Set<string>());
	};

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
		setSelected: (s: Set<string>) => Set<string>
	) => {
		const sortedTags = Array.from(tags)
			.filter((tag) => tag.trim().length > 0)
			.sort((a, b) => a.localeCompare(b));

		if (sortedTags.length === 0) return null;

		return (
			<div key={category} className="flex-1 min-w-[200px]">
				<Select
					placeholder={`Select ${category.toLowerCase()}...`}
					selectionMode="multiple"
					selectedKeys={selected}
					onSelectionChange={(keys) => setSelected(new Set(keys))}
					label={category}
					classNames={{
						base: "w-full",
						trigger: "min-h-[44px]",
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
		<div className="w-full">
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
				<div>
					<h3 className="text-lg font-semibold text-slate-900">Filter Projects</h3>
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
							className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
						>
							Clear all filters
						</button>
					)}
				</div>
			</div>

			{Object.keys(availableTagsByCategory).length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{CATEGORY_PRIORITY.map((category) => {
						const tags = availableTagsByCategory[category];
						if (!tags || tags.size === 0) return null;

						let selected: Set<string>;
						let setSelected: (s: Set<string>) => Set<string>;

						switch (category) {
							case "School Level":
								selected = selectedSchoolLevel;
								setSelected = setSelectedSchoolLevel;
								break;
							case "Location":
								selected = selectedLocation;
								setSelected = setSelectedLocation;
								break;
							case "Type":
								selected = selectedType;
								setSelected = setSelectedType;
								break;
							case "Sponsor":
								selected = selectedSponsor;
								setSelected = setSelectedSponsor;
								break;
							case "Cost":
								selected = selectedCost;
								setSelected = setSelectedCost;
								break;
							case "Other":
								selected = selectedOther;
								setSelected = setSelectedOther;
								break;
							default:
								return null;
						}

						return renderCategoryDropdown(category, tags, selected, setSelected);
					})}
				</div>
			) : (
				<div className="text-center py-8 bg-slate-50 rounded-2xl">
					<p className="text-slate-500 text-sm">No project tags available</p>
				</div>
			)}
		</div>
	);
}
