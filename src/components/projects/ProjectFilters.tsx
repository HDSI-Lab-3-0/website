import { useState, useEffect } from "react";
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
	const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
	const [isOpen, setIsOpen] = useState(true);

	const availableTagsByCategory = getAvailableTagsByCategory(availableProjects);

	useEffect(() => {
		onFiltersChange(Array.from(selectedTags));
	}, [selectedTags, onFiltersChange]);

	const toggleTag = (tag: string) => {
		const newSelectedTags = new Set(selectedTags);
		if (newSelectedTags.has(tag)) {
			newSelectedTags.delete(tag);
		} else {
			newSelectedTags.add(tag);
		}
		setSelectedTags(newSelectedTags);
	};

	const clearAllFilters = () => {
		setSelectedTags(new Set());
	};


	const orderedCategories = Object.entries(availableTagsByCategory).sort(
		([a], [b]) => {
			const indexA = CATEGORY_PRIORITY.indexOf(a);
			const indexB = CATEGORY_PRIORITY.indexOf(b);
			if (indexA === -1 && indexB === -1) return a.localeCompare(b);
			if (indexA === -1) return 1;
			if (indexB === -1) return -1;
			return indexA - indexB;
		}
	);

	return (
		<div className="w-full">
			<div className="lg:hidden mb-4">
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="w-full flex items-center justify-between border border-slate-200 rounded-2xl px-4 py-4 min-h-[48px] hover:border-slate-300 hover:bg-slate-50 transition-colors touch-manipulation"
				>
					<span className="font-semibold text-slate-900 text-base">Project Filters</span>
					<div className="flex items-center gap-2">
						{selectedTags.size > 0 && (
							<span className="bg-slate-900 text-white text-sm px-3 py-1.5 rounded-full min-h-[28px] flex items-center justify-center">
								{selectedTags.size}
							</span>
						)}
						<svg
							className={`w-5 h-5 text-slate-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</div>
				</button>
			</div>

			<div
				className={`${isOpen ? "block" : "hidden"} lg:block bg-white border border-slate-200 rounded-2xl shadow-sm p-5 lg:relative lg:top-0`}
			>
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-base font-semibold text-slate-900 tracking-tight">Filter Projects</h3>
					{selectedTags.size > 0 && (
						<button
							onClick={clearAllFilters}
							className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
						>
							Clear All
						</button>
					)}
				</div>

				<div className="space-y-5">
					{orderedCategories.map(([category, tags]) => (
						<div key={category} className="group">
							<div className="flex items-center mb-3">
								<div className="h-px bg-slate-200 flex-1 mr-3"></div>
								<h3 className="!text-xs !font-semibold !text-slate-500 !uppercase !tracking-[0.2em] !whitespace-nowrap !leading-none !m-0">
									{category}
								</h3>
								<div className="h-px bg-slate-200 flex-1 ml-3"></div>
							</div>
							<div className="flex flex-wrap gap-3">
								{Array.from(tags)
									.filter((tag) => tag.trim().length > 0)
									.sort((a, b) => a.localeCompare(b))
									.map((tag) => (
										<button
											key={tag}
											type="button"
											onClick={() => toggleTag(tag)}
											className={`px-4 py-2 min-h-[44px] min-w-[44px] rounded-full border text-sm font-semibold tracking-wide transition-all duration-200 touch-manipulation ${
												selectedTags.has(tag)
													? "border-slate-900 bg-slate-900 text-white shadow-md transform scale-105"
													: "border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-900 hover:bg-slate-50 active:scale-95"
											}`}
										>
											{tag}
										</button>
									))}
							</div>
						</div>
					))}
				</div>

				{Object.keys(availableTagsByCategory).length === 0 && (
					<div className="text-center py-8">
						<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-3">
							<svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
							</svg>
						</div>
						<p className="text-blue-500 text-sm font-medium">
							No project tags available
						</p>
					</div>
				)}
			</div>
		</div>
	);
}