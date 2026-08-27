import { useMemo, useCallback } from "react";
import { HeroUIProvider } from "@heroui/react";
import type { CollectionEntry } from "astro:content";
import EventGrid from "@/components/events/EventGrid.tsx";
import { getEventDisplayStatus, isEventActive } from "@/utils/projectHelpers.ts";

interface EventsAppProps {
	events: CollectionEntry<"events">[];
}

const mailingListUrl = "https://forms.gle/ZJpHG1mCB6ShiYJy9";

export default function EventsApp({ events }: EventsAppProps) {
	const upcomingEvents = useMemo(
		() => events.filter((event) => isEventActive(getEventDisplayStatus(event))),
		[events]
	);

	const pastEvents = useMemo(
		() => events.filter((event) => !isEventActive(getEventDisplayStatus(event))),
		[events]
	);

	const handleEventClick = useCallback((event: CollectionEntry<"events">) => {
		if (!event.id) {
			// Fallback to events index page if ID is undefined
			window.location.href = '/events';
			return;
		}
		window.location.href = `/events/${event.id}`;
	}, []);

	return (
		<HeroUIProvider>
			<div className="events-app">
				<section className="events-section">
					<div className="events-section-header">
						<h2 className="events-section-title">Upcoming Events</h2>
					</div>

					{upcomingEvents.length > 0 ? (
						<EventGrid events={upcomingEvents} onEventClick={handleEventClick} />
					) : (
						<div className="events-empty">
							<div className="events-empty-icon">
								<svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
							</div>
							<h3 className="events-empty-title">No upcoming events right now</h3>
							<p className="events-empty-text">
								We are planning on our next round of workshops, showcases, and community events.
								Check back soon for new opportunities, or{" "}
								<a href={mailingListUrl} target="_blank" rel="noopener noreferrer">
									sign up for our mailing list
								</a>.
							</p>
							<p className="events-empty-text">
								<strong>Fall & Winter opportunities are coming soon.</strong>
								<br />
								We&apos;re currently planning our Fall 2026 and Winter 2027 workshops, programs, and events.
								New opportunities will be posted by <strong>October 2026</strong>.
							</p>
						</div>
					)}
				</section>

				{pastEvents.length > 0 && (
					<section className="events-section">
						<details className="past-events-details">
							<summary className="events-section-title">Past Events</summary>
							<div className="past-events-grid">
								<EventGrid events={pastEvents} onEventClick={handleEventClick} />
							</div>
						</details>
					</section>
				)}
			</div>
		</HeroUIProvider>
	);
}
