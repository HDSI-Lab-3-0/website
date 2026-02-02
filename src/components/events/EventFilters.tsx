import { useState, useEffect } from "react";
import type { CollectionEntry } from "astro:content";
import { Select, SelectItem } from "@heroui/react";

interface EventFiltersProps {
	onFiltersChange: (
		selectedAudience: Set<string>,
		selectedType: Set<string>,
		selectedLocation: Set<string>,
		selectedTopic: Set<string>,
		selectedOther: Set<string>
	) => void;
	availableEvents: CollectionEntry<"events">[];
}

// Get all unique tags from available events, organized by category
function getAvailableTagsByCategory(
	events: CollectionEntry<"events">[]
): Record<string, Set<string>> {
	const tagsByCategory: Record<string, Set<string>> = {};

	// Define categories
	const categories = {
		Audience: [
			"K-12 Students",
			"K-12 Teachers",
			"UCSD Students",
			"UCSD Faculty",
			"General Public",
		],
		Type: ["Workshop", "Seminar", "Exhibition", "Competition", "Conference", "Training"],
		Location: ["in classroom", "out of classroom", "at UCSD", "online", "hybrid"],
		Topic: ["STEM", "Engineering", "Science", "Mathematics", "Technology", "Arts"],
	};

	// Initialize category sets
	Object.keys(categories).forEach((cat) => {
		tagsByCategory[cat] = new Set();
	});

	// Categorize tags from all events
	events.forEach((event) => {
		if (event.data.eventTags) {
			event.data.eventTags.forEach((tag) => {
				for (const [category, categoryTags] of Object.entries(categories)) {
					if (
						categoryTags.some(
							(catTag) => catTag.toLowerCase() === tag.toLowerCase()
						)
					) {
						tagsByCategory[category].add(tag);
					}
				}
			});
		}
	});

	// Add remaining tags to "Other" category
	const usedTags = new Set<string>();
	Object.values(tagsByCategory).forEach((tags) => {
		tags.forEach((tag) => usedTags.add(tag.toLowerCase()));
	});

	const otherTags = new Set<string>();
	events.forEach((event) => {
		if (event.data.eventTags) {
			event.data.eventTags.forEach((tag) => {
				if (!usedTags.has(tag.toLowerCase())) {
					otherTags.add(tag);
				}
			});
		}
	});

	if (otherTags.size > 0) {
		tagsByCategory["Other"] = otherTags;
	}

	return tagsByCategory;
}

const CATEGORY_PRIORITY = [
	"Audience",
	"Type",
	"Location",
	"Topic",
	"Other",
];

export default function EventFilters({
	onFiltersChange,
	availableEvents,
}: EventFiltersProps) {
	// State for each category
	const [selectedAudience, setSelectedAudience] = useState<Set<string>>(
		new Set([])
	);
	const [selectedType, setSelectedType] = useState<Set<string>>(new Set([]));
	const [selectedLocation, setSelectedLocation] = useState<Set<string>>(
		new Set([])
	);
	const [selectedTopic, setSelectedTopic] = useState<Set<string>>(new Set([]));
	const [selectedOther, setSelectedOther] = useState<Set<string>>(new Set([]));

	const availableTagsByCategory = getAvailableTagsByCategory(availableEvents);

	// Trigger callback with all selected sets
	useEffect(() => {
		onFiltersChange(
			selectedAudience,
			selectedType,
			selectedLocation,
			selectedTopic,
			selectedOther
		);
	}, [
		selectedAudience,
		selectedType,
		selectedLocation,
		selectedTopic,
		selectedOther,
		onFiltersChange,
	]);

	const hasFilters =
		selectedAudience.size +
			selectedType.size +
			selectedLocation.size +
			selectedTopic.size +
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
					<h3 className="text-lg font-semibold text-slate-900">Filter Events</h3>
					{hasFilters && (
						<button
							onClick={() => {
								setSelectedAudience(new Set<string>());
								setSelectedType(new Set<string>());
								setSelectedLocation(new Set<string>());
								setSelectedTopic(new Set<string>());
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
							case "Audience":
								selected = selectedAudience;
								setSelected = setSelectedAudience;
								break;
							case "Type":
								selected = selectedType;
								setSelected = setSelectedType;
								break;
							case "Location":
								selected = selectedLocation;
								setSelected = setSelectedLocation;
								break;
							case "Topic":
								selected = selectedTopic;
								setSelected = setSelectedTopic;
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
					<p className="text-slate-500 text-sm">No event tags available</p>
				</div>
			)}
		</div>
	);
}
