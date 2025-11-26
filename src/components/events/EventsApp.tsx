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
	console.log('EventsApp component loaded with', events.length, 'events');
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const activeFiltersElement = document.getElementById("active-filters");
		if (activeFiltersElement) {
			activeFiltersElement.textContent = selectedTags.length.toString();
		}
	}, [selectedTags]);

	// Update event counts in the hero section
	useEffect(() => {
		const upcomingCount = events.filter(event => 
			isEventUpcoming(event.data.eventDateStart)
		).length;
		const pastCount = events.filter(event => 
			isEventPast(event.data.eventDateEnd)
		).length;
		
		const upcomingElement = document.getElementById("upcoming-count");
		const pastElement = document.getElementById("past-count");
		
		if (upcomingElement) upcomingElement.textContent = upcomingCount.toString();
		if (pastElement) pastElement.textContent = pastCount.toString();
	}, [events]);

	const filteredEvents = useMemo(() => {
		if (selectedTags.length === 0) {
			return events;
		}

		return events.filter((event) => {
			const eventTags = event.data.eventTags || [];
			return selectedTags.some((tag) =>
				eventTags.some((et) => et.toLowerCase() === tag.toLowerCase())
			);
		});
	}, [events, selectedTags]);

	// Reset to page 1 when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [selectedTags]);

	// Calculate pagination
	const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
	const paginatedEvents = useMemo(() => {
		const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
		const endIndex = startIndex + EVENTS_PER_PAGE;
		return filteredEvents.slice(startIndex, endIndex);
	}, [filteredEvents, currentPage]);

	const handleEventClick = useCallback((event: CollectionEntry<"events">) => {
		// Navigate to event detail page
		console.log('Event clicked:', event);
		console.log('Event ID:', event.id);
		if (!event.id) {
			console.error('Event ID is undefined for event:', event);
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
			<div className="flex flex-col lg:flex-row gap-10 items-start">
				<aside className="w-full lg:w-64 lg:flex-none lg:sticky lg:top-24 lg:h-fit lg:z-10">
					<EventFilters
						onFiltersChange={setSelectedTags}
						availableEvents={events}
					/>
				</aside>

				<section className="flex-1 min-w-0 w-full">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
						<h2 className="text-2xl font-semibold text-slate-900">Available Events</h2>
						<span className="text-sm text-slate-600">
							Showing {paginatedEvents.length} of {filteredEvents.length} events
							{filteredEvents.length !== events.length && ` (${events.length} total)`}
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
						<div className="text-center py-16">
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
								<svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
							</div>
							<h3 className="text-xl font-semibold text-slate-900 mb-2">No events found</h3>
							<p className="text-slate-600 mb-4">
								{selectedTags.length > 0
									? "No events match your selected filters. Try adjusting your filters."
									: "No events are available at the moment."}
							</p>
							{selectedTags.length > 0 && (
								<button
									onClick={() => setSelectedTags([])}
									className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
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