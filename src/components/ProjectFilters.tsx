import React, { useState, useEffect } from "react";
import type { CollectionEntry } from "astro:content";
import tagsData from "../data/tags.json";

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
					className="w-full flex items-center justify-between bg-gradient-to-r from-slate-50 to-white border border-slate-200/60 backdrop-blur-sm rounded-xl px-4 py-3 hover:shadow-md transition-all duration-300 shadow-sm"
				>
					<span className="font-semibold text-slate-800 text-sm">Filters</span>
					<svg
						className={`w-4 h-4 text-slate-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
				</button>
			</div>

			<div
				className={`${isOpen ? "block" : "hidden"} lg:block bg-gradient-to-br from-white to-slate-50/30 border border-slate-200/60 backdrop-blur-sm rounded-xl shadow-lg p-5`}
			>
				<div className="space-y-5">
					{orderedCategories.map(([category, tags]) => (
						<div key={category} className="group">
							<div className="flex items-center mb-3">
								<div className="h-px bg-gradient-to-r from-slate-200 to-transparent flex-1 mr-3"></div>
								<h3 className="!text-sm !font-bold !text-slate-600 !uppercase !tracking-wider !whitespace-nowrap !leading-none !m-0">
									{category}
								</h3>
								<div className="h-px bg-gradient-to-l from-slate-200 to-transparent flex-1 ml-3"></div>
							</div>
							<div className="space-y-0.5">
								{Array.from(tags)
									.filter((tag) => tag.trim().length > 0)
									.sort((a, b) => a.localeCompare(b))
									.map((tag) => (
										<label
											key={tag}
											className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-all duration-200 hover:bg-slate-50/80 group"
										>
											<div className="relative">
												<input
													type="checkbox"
													checked={selectedTags.has(tag)}
													onChange={() => toggleTag(tag)}
													className="sr-only"
												/>
												<div className={`w-4 h-4 rounded border-2 transition-all duration-200 ${
													selectedTags.has(tag)
														? 'bg-blue-600 border-blue-600'
														: 'border-slate-300 group-hover:border-slate-400'
												}`}>
													{selectedTags.has(tag) && (
														<svg className="w-3 h-3 text-white mx-auto" fill="currentColor" viewBox="0 0 20 20">
															<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
														</svg>
													)}
												</div>
											</div>
											<span className={`text-sm font-medium transition-colors duration-200 ${
												selectedTags.has(tag)
													? 'text-slate-900'
													: 'text-slate-600 group-hover:text-slate-800'
											}`}>
												{tag}
											</span>
										</label>
									))}
							</div>
						</div>
					))}
				</div>

				{Object.keys(availableTagsByCategory).length === 0 && (
					<div className="text-center py-8">
						<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-3">
							<svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
							</svg>
						</div>
						<p className="text-slate-500 text-sm font-medium">
							No tags available
						</p>
					</div>
				)}
			</div>
		</div>
	);
}