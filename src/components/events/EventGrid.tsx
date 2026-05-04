import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { Chip } from "@heroui/react";
import type { CollectionEntry } from "astro:content";
import { CalendarDays, Clock3, MapPin, Users } from "lucide-react";

import {
	getImageSrc,
	formatEventDateTimeRange,
	getEventStatusBadgeProps,
	getEventLocation,
	getEventAudience,
	getEventDuration,
	getEventStatus,
	getEventStatusLabel,
} from "@/utils/eventHelpers.ts";

interface EventGridProps {
	events: CollectionEntry<"events">[];
	onEventClick: (event: CollectionEntry<"events">) => void;
}

export default function EventGrid({
	events,
	onEventClick,
}: EventGridProps) {
	const [referenceDate, setReferenceDate] = useState<Date>(() => new Date());

	useEffect(() => {
		setReferenceDate(new Date());
		
		const interval = setInterval(() => {
			setReferenceDate(new Date());
		}, 60000);
		
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="events-grid">
			{events.map((event) => {
				const displayImage =
					getImageSrc(event.data.eventImage) ||
					getImageSrc(event.data.imageGif) ||
					getImageSrc(event.data.heroImage) ||
					"";

				const eventHref = `/events/${event.id}`;
				const handleEventSelect = (eventClick: MouseEvent<HTMLAnchorElement>) => {
					if (
						eventClick.defaultPrevented ||
						eventClick.metaKey ||
						eventClick.ctrlKey ||
						eventClick.shiftKey ||
						eventClick.altKey ||
						eventClick.button !== 0
					) {
						return;
					}

					eventClick.preventDefault();
					onEventClick(event);
				};

				const dateTimeRange =
					event.data.eventDateLabel ||
					formatEventDateTimeRange(
						event.data.eventDateStart,
						event.data.eventDateEnd
					);
				const location = event.data.eventLocation?.trim() || getEventLocation(event.data.eventTags);
				const audience = event.data.eventFor?.trim() || getEventAudience(event.data.eventTags);
				const duration = getEventDuration(event.data.eventDateStart, event.data.eventDateEnd);
				const tags = event.data.eventTags ?? [];

				const statusLabel = getEventStatusLabel(event.data.eventDateStart, event.data.eventDateEnd, referenceDate);
				let computedStatus = event.data.eventDateLabel
					? event.data.eventStatus
					: getEventStatus(event.data.eventDateStart, event.data.eventDateEnd, referenceDate);
				if (computedStatus === "past") {
					computedStatus = "completed";
				}
				const isOngoing = computedStatus === "ongoing";
				const isPast = computedStatus === "completed";
				const statusBadgeProps = getEventStatusBadgeProps(computedStatus);
				const displayStatusLabel =
					computedStatus === "ongoing"
						? "Ongoing"
						: computedStatus === "completed"
							? "Past"
							: computedStatus === "cancelled"
								? "Cancelled"
								: statusLabel;

				const detailItems = [
					{ Icon: CalendarDays, label: dateTimeRange },
					{ Icon: MapPin, label: location },
					{ Icon: Clock3, label: duration },
				].filter(({ label }) => Boolean(label));

				return (
					<a
						key={event.id}
						href={eventHref}
						className={`event-card group ${isOngoing ? 'event-card-ongoing' : isPast ? 'event-card-past' : 'event-card-upcoming'}`}
						onClick={handleEventSelect}
						aria-label={`View details for ${event.data.eventName}`}
					>
						{/* Card image */}
						<div className="event-card-image">
							{displayImage ? (
								<img
									src={displayImage}
									alt={event.data.eventName}
									className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
									loading="lazy"
								/>
							) : (
								<div
									className="w-full h-full bg-slate-200"
									aria-hidden
								/>
							)}
							<div className="event-card-overlay" />
							<div className="event-card-status-badge">
								<Chip size="sm" {...statusBadgeProps} className="event-status-chip">
									{isOngoing ? "Ongoing" : isPast ? "Completed" : "Upcoming"}
								</Chip>
								{isOngoing && (
									<Chip size="sm" color="success" variant="solid" className="event-live-chip">
										Live
									</Chip>
								)}
							</div>
							<div className="event-card-date-label">
								<span className="event-card-date-label-text">
									{isOngoing ? "Happening now" : isPast ? "Past event" : "Upcoming"}
								</span>
								<span className="event-card-date-label-date">{dateTimeRange}</span>
							</div>
						</div>

						{/* Card content */}
						<div className="event-card-content">
							<div className="event-card-status">
								<Chip size="sm" {...statusBadgeProps} className="event-status-chip-inline">
									{displayStatusLabel}
								</Chip>
							</div>

							<h3 className="event-card-title">
								{event.data.eventName}
							</h3>

							<p className="event-card-description">
								{event.data.eventDescription}
							</p>

							{/* Audience row */}
							{audience && (
								<div className="event-card-meta-row">
									<Users className="event-meta-icon" strokeWidth={2} aria-hidden="true" />
									<span className="event-meta-text">{audience}</span>
								</div>
							)}

							{/* Date/Time/Location details */}
							<div className="event-card-details">
								{detailItems.map(({ Icon, label }, index) => (
									<div key={`${label}-${index}`} className="event-card-meta-row">
										<Icon className="event-meta-icon" strokeWidth={2} aria-hidden="true" />
										<span className="event-meta-text">{label}</span>
									</div>
								))}
							</div>

							{/* Tags */}
							<div className="event-card-tags">
								{tags.map((tag) => (
									<span key={tag} className="event-tag">
										{tag}
									</span>
								))}
							</div>

							{/* Footer */}
							<div className="event-card-footer">
								<span className="event-footer-label">Details</span>
								<div className="event-footer-line" />
								<span className="event-footer-button" aria-hidden="true">
									View details
								</span>
							</div>
						</div>
					</a>
				);
			})}
		</div>
	);
}
