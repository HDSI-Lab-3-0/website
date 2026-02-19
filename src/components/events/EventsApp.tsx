import { useState, useMemo, useCallback, useEffect } from "react";
import { HeroUIProvider } from "@heroui/react";
import type { CollectionEntry } from "astro:content";
import EventFilters from "@/components/events/EventFilters.tsx";
import EventGrid from "@/components/events/EventGrid.tsx";
import EventPagination from "@/components/events/EventPagination.tsx";
import { isEventUpcoming, isEventPast } from "@/utils/eventHelpers.ts";

interface EventsAppProps {
	events: CollectionEntry<"events">[];
}

const EVENTS_PER_PAGE = 9;

export default function EventsApp({ events }: EventsAppProps) {
	const [selectedAudience, setSelectedAudience] = useState<Set<string>>(
		new Set([])
	);
	const [selectedType, setSelectedType] = useState<Set<string>>(new Set([]));
	const [selectedLocation, setSelectedLocation] = useState<Set<string>>(
		new Set([])
	);
	const [selectedTopic, setSelectedTopic] = useState<Set<string>>(new Set([]));
	const [selectedOther, setSelectedOther] = useState<Set<string>>(new Set([]));
	const [currentPage, setCurrentPage] = useState(1);
	const [eventStats, setEventStats] = useState({ upcoming: 0, past: 0 });

	useEffect(() => {
		const activeFiltersElement = document.getElementById("active-filters");
		if (activeFiltersElement) {
			const totalSelected =
				selectedAudience.size +
				selectedType.size +
				selectedLocation.size +
				selectedTopic.size +
				selectedOther.size;
			activeFiltersElement.textContent = totalSelected.toString();
		}
	}, [selectedAudience, selectedType, selectedLocation, selectedTopic, selectedOther]);

	// Helper function to check if an event's tags match any selected tags in a category
	const matchesCategory = (
		eventTags: string[],
		selectedTags: Set<string>
	): boolean => {
		if (selectedTags.size === 0) return true;
		return Array.from(selectedTags).some((selectedTag) =>
			eventTags.some((et) => et.toLowerCase() === selectedTag.toLowerCase())
		);
	};

	// Update event counts in the hero section
	useEffect(() => {
		// Use a fixed reference date to ensure server/client consistency
		const referenceDate = typeof window !== 'undefined' ? new Date() : new Date('2025-01-01T00:00:00.000Z');
		const upcomingCount = events.filter(event =>
			isEventUpcoming(event.data.eventDateStart, referenceDate)
		).length;
		const pastCount = events.filter(event =>
			isEventPast(event.data.eventDateEnd, referenceDate)
		).length;
		
		setEventStats({ upcoming: upcomingCount, past: pastCount });

		const upcomingElement = document.getElementById("upcoming-count");
		const pastElement = document.getElementById("past-count");
		
		if (upcomingElement) upcomingElement.textContent = upcomingCount.toString();
		if (pastElement) pastElement.textContent = pastCount.toString();
	}, [events]);

	const filteredEvents = useMemo(() => {
		return events.filter((event) => {
			const eventTags = event.data.eventTags || [];
			return (
				matchesCategory(eventTags, selectedAudience) &&
				matchesCategory(eventTags, selectedType) &&
				matchesCategory(eventTags, selectedLocation) &&
				matchesCategory(eventTags, selectedTopic) &&
				matchesCategory(eventTags, selectedOther)
			);
		});
	}, [
		events,
		selectedAudience,
		selectedType,
		selectedLocation,
		selectedTopic,
		selectedOther,
	]);

	// Reset to page 1 when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [
		selectedAudience,
		selectedType,
		selectedLocation,
		selectedTopic,
		selectedOther,
	]);

	// Calculate pagination
	const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
	const paginatedEvents = useMemo(() => {
		const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
		const endIndex = startIndex + EVENTS_PER_PAGE;
		return filteredEvents.slice(startIndex, endIndex);
	}, [filteredEvents, currentPage]);

	const handleEventClick = useCallback((event: CollectionEntry<"events">) => {
		if (!event.id) {
			// Fallback to events index page if ID is undefined
			window.location.href = '/events';
			return;
		}
		window.location.href = `/events/${event.id}`;
	}, []);

	const handlePageChange = useCallback((page: number) => {
		setCurrentPage(page);
		// Scroll to top of events section
		const eventsMain = document.querySelector('.events-page-main');
		if (eventsMain) {
			eventsMain.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, []);

	return (
		<HeroUIProvider>
			<div className="events-app">
				{/* Filters at the top */}
				<section className="events-filters-section">
					<EventFilters
						onFiltersChange={(
							audience,
							type,
							location,
							topic,
							other
						) => {
							setSelectedAudience(audience);
							setSelectedType(type);
							setSelectedLocation(location);
							setSelectedTopic(topic);
							setSelectedOther(other);
						}}
						availableEvents={events}
					/>
				</section>

				{/* Events grid */}
				<section className="events-section">
					<div className="events-section-header">
						<h2 className="events-section-title">Available Events</h2>
						<span className="events-section-count">
							{filteredEvents.length} of {events.length}
						</span>
					</div>

					{paginatedEvents.length > 0 ? (
						<>
							<EventGrid events={paginatedEvents} onEventClick={handleEventClick} />
							<EventPagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						</>
					) : (
						<div className="events-empty">
							<div className="events-empty-icon">
								<svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
							</div>
							<h3 className="events-empty-title">No events found</h3>
							<p className="events-empty-text">
								{selectedAudience.size +
									selectedType.size +
									selectedLocation.size +
									selectedTopic.size +
									selectedOther.size >
								0
									? "No events match your selected filters. Try adjusting your filters."
									: "No events are available at the moment."}
							</p>
							{selectedAudience.size +
								selectedType.size +
								selectedLocation.size +
								selectedTopic.size +
								selectedOther.size >
								0 && (
								<button
									onClick={() => {
										setSelectedAudience(new Set<string>());
										setSelectedType(new Set<string>());
										setSelectedLocation(new Set<string>());
										setSelectedTopic(new Set<string>());
										setSelectedOther(new Set<string>());
									}}
									className="events-empty-clear"
								>
									Clear all filters
								</button>
							)}
						</div>
					)}
				</section>
			</div>
		</HeroUIProvider>
	);
}
