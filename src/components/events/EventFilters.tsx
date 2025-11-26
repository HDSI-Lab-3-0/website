import { useState, useEffect } from "react";
import type { CollectionEntry } from "astro:content";

interface EventFiltersProps {
	onFiltersChange: (selectedTags: string[]) => void;
	availableEvents: CollectionEntry<"events">[];
}

// Get all unique tags from available events
function getAvailableTags(events: CollectionEntry<"events">[]): Set<string> {
	const tags = new Set<string>();

	events.forEach((event) => {
		if (event.data.eventTags) {
			event.data.eventTags.forEach((tag) => tags.add(tag));
		}
	});

	return tags;
}

// Categorize tags for better organization
function categorizeTags(tags: Set<string>): Record<string, string[]> {
	const categorized: Record<string, string[]> = {};
	
	// Define categories
	const categories = {
		"Audience": ["K-12 Students", "K-12 Teachers", "UCSD Students", "UCSD Faculty", "General Public"],
		"Type": ["Workshop", "Seminar", "Exhibition", "Competition", "Conference", "Training"],
		"Location": ["in classroom", "out of classroom", "at UCSD", "online", "hybrid"],
		"Topic": ["STEM", "Engineering", "Science", "Mathematics", "Technology", "Arts"],
	};

	// Categorize tags
	const usedTags = new Set<string>();
	
	Object.entries(categories).forEach(([categoryName, categoryTags]) => {
		const matchingTags = Array.from(tags).filter((tag) =>
			categoryTags.some((catTag) => catTag.toLowerCase() === tag.toLowerCase())
		);
		
		if (matchingTags.length > 0) {
			categorized[categoryName] = matchingTags;
			matchingTags.forEach((tag) => usedTags.add(tag.toLowerCase()));
		}
	});

	// Add remaining tags to "Other" category
	const otherTags = Array.from(tags).filter(
		(tag) => !usedTags.has(tag.toLowerCase())
	);
	if (otherTags.length > 0) {
		categorized["Other"] = otherTags;
	}

	return categorized;
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
	const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
	const [isOpen, setIsOpen] = useState(true);

	const availableTags = getAvailableTags(availableEvents);
	const categorizedTags = categorizeTags(availableTags);

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

	const orderedCategories = Object.entries(categorizedTags).sort(
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
			<div className="lg:hidden mb-4 sticky top-20 z-20 bg-white/95 backdrop-blur-sm py-2">
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="w-full flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 backdrop-blur-sm rounded-xl px-4 py-3 hover:shadow-md transition-all duration-300 shadow-sm"
				>
					<span className="font-semibold text-blue-800 text-sm">Event Filters</span>
					<div className="flex items-center gap-2">
						{selectedTags.size > 0 && (
							<span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
								{selectedTags.size}
							</span>
						)}
						<svg
							className={`w-4 h-4 text-blue-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
				className={`${isOpen ? "block" : "hidden"} lg:block bg-gradient-to-br from-blue-50/50 to-indigo-50/30 border border-blue-200/60 backdrop-blur-sm rounded-xl shadow-lg p-5 lg:relative lg:top-0`}
			>
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-semibold text-blue-900">Filter Events</h3>
					{selectedTags.size > 0 && (
						<button
							onClick={clearAllFilters}
							className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
						>
							Clear All
						</button>
					)}
				</div>

				<div className="space-y-5">
					{orderedCategories.map(([category, tags]) => (
						<div key={category} className="group">
							<div className="flex items-center mb-3">
								<div className="h-px bg-gradient-to-r from-blue-200 to-transparent flex-1 mr-3"></div>
								<h3 className="!text-sm !font-bold !text-blue-700 !uppercase !tracking-wider !whitespace-nowrap !leading-none !m-0">
									{category}
								</h3>
								<div className="h-px bg-gradient-to-l from-blue-200 to-transparent flex-1 ml-3"></div>
							</div>
							<div className="space-y-0.5">
								{tags
									.filter((tag) => tag.trim().length > 0)
									.sort((a, b) => a.localeCompare(b))
									.map((tag) => (
										<label
											key={tag}
											className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-all duration-200 hover:bg-blue-50/80 group"
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
														: 'border-blue-300 group-hover:border-blue-400'
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
													? 'text-blue-900'
													: 'text-blue-700 group-hover:text-blue-900'
											}`}>
												{tag}
											</span>
										</label>
									))}
							</div>
						</div>
					))}
				</div>

				{availableTags.size === 0 && (
					<div className="text-center py-8">
						<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-3">
							<svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
							</svg>
						</div>
						<p className="text-blue-500 text-sm font-medium">
							No event tags available
						</p>
					</div>
				)}
			</div>
		</div>
	);
}