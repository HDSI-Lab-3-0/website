import { Card, CardBody, Chip, Button } from "@heroui/react";
import type { CollectionEntry } from "astro:content";
import {
	getImageSrc,
	formatEventDateTimeRange,
	getEventStatusBadgeProps,
	getEventLocation,
	getEventAudience,
	getEventDuration,
	isEventOngoing,
	isEventPast,
} from "@/utils/eventHelpers.ts";

interface EventGridProps {
	events: CollectionEntry<"events">[];
	onEventClick: (event: CollectionEntry<"events">) => void;
}

export default function EventGrid({
	events,
	onEventClick,
}: EventGridProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 overflow-hidden">
			{events.map((event) => {
				const displayImage =
					getImageSrc(event.data.eventImage) ||
					getImageSrc(event.data.imageGif) ||
					getImageSrc(event.data.heroImage) ||
					"/assets/project-placeholder-1.jpg";
				
				const handleEventSelect = () => {
					onEventClick(event);
				};

				const statusBadgeProps = getEventStatusBadgeProps(event.data.eventStatus);
				const dateTimeRange = formatEventDateTimeRange(
					event.data.eventDateStart,
					event.data.eventDateEnd
				);
				const location = event.data.eventLocation?.trim() || getEventLocation(event.data.eventTags);
				const audience = event.data.eventFor?.trim() || getEventAudience(event.data.eventTags);
				const duration = getEventDuration(event.data.eventDateStart, event.data.eventDateEnd);

				// Debug logging for hydration mismatch
				console.log('EventGrid - eventFor:', event.data.eventFor);
				console.log('EventGrid - audience:', audience);
				console.log('EventGrid - audience length:', audience?.length);

				// Determine event state for visual styling
				// Use a fixed reference date to ensure server/client consistency
				const referenceDate = typeof window !== 'undefined' ? new Date() : new Date('2025-01-01T00:00:00.000Z');
				const isOngoing = isEventOngoing(event.data.eventDateStart, event.data.eventDateEnd, referenceDate);
				const isPast = isEventPast(event.data.eventDateEnd, referenceDate);
				
				// Debug logging for date/time comparisons
				console.log('EventGrid - eventDateStart:', event.data.eventDateStart);
				console.log('EventGrid - eventDateEnd:', event.data.eventDateEnd);
				console.log('EventGrid - referenceDate:', referenceDate);
				console.log('EventGrid - isOngoing:', isOngoing);
				console.log('EventGrid - isPast:', isPast);
				
				// Get card styling based on event state
				const getCardStyling = () => {
					if (isOngoing) {
						return "border-green-300 bg-gradient-to-br from-green-50 to-white hover:from-green-100 hover:shadow-green-200/50";
					} else if (isPast) {
						return "border-gray-300 bg-gray-50 opacity-90 hover:opacity-100 hover:shadow-gray-200/50";
					} else {
						return "border-blue-200 bg-white hover:from-blue-50 hover:shadow-blue-200/50";
					}
				};

				const cardStyling = getCardStyling();
				
				return (
					<div
						key={event.id}
						className={`group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${cardStyling}`}
						onClick={handleEventSelect}
					>
						<Card
							isHoverable={false}
							className="border-0 bg-transparent shadow-none h-full flex flex-col"
						>
						{/* Card header with image and status badge */}
						<div className="relative h-48 overflow-hidden">
							<img
								src={displayImage}
								alt={event.data.eventName}
								className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
							/>
							{/* Status badge overlay */}
							<div className="absolute top-3 right-3">
								<Chip
									size="sm"
									{...statusBadgeProps}
								>
									{event.data.eventStatus}
								</Chip>
							</div>
							{/* Ongoing event indicator */}
							{isOngoing && (
								<div className="absolute top-3 left-3">
									<Chip
										size="sm"
										color="success"
										variant="solid"
										className="animate-pulse"
									>
										LIVE
									</Chip>
								</div>
							)}
						</div>

						{/* Card body */}
						<CardBody className="p-5 flex flex-col h-full overflow-hidden">
							{/* Audience badge with proper text truncation */}
							<div className="mb-3">
								<Chip
									size="sm"
									variant="flat"
									className="bg-slate-100 text-slate-600 text-xs max-w-full"
								>
									<span className="truncate block max-w-[200px]" title={audience}>
										{audience}
									</span>
								</Chip>
							</div>

							<h3 className="text-xl font-semibold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
								{event.data.eventName}
							</h3>

							<p className="text-slate-600 text-sm mb-4 line-clamp-3">
								{event.data.eventDescription}
							</p>

							{/* Event details */}
							<div className="space-y-2 mb-4 text-sm text-slate-600">
								<div className="flex items-start gap-2 min-w-0">
									<svg
										className="w-4 h-4 text-blue-500 flex-shrink-0"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
									<span className="leading-snug break-words">{dateTimeRange}</span>
								</div>
								<div className="flex items-start gap-2 min-w-0 text-slate-500">
									<svg
										className="w-4 h-4 flex-shrink-0"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
									<span className="leading-snug break-words">{location}</span>
								</div>
								<div className="flex items-start gap-2 min-w-0 text-slate-500">
									<svg
										className="w-4 h-4 flex-shrink-0"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<span className="leading-snug break-words">{duration}</span>
								</div>
							</div>

							{/* Tags row */}
							<div className="flex flex-wrap gap-2 mb-4">
								{event.data.eventTags?.slice(0, 2).map((tag) => (
									<Chip
										key={tag}
										size="sm"
										variant="flat"
										className="bg-blue-100 text-blue-600 text-xs max-w-[120px] truncate"
										title={tag.length > 15 ? tag : undefined}
									>
										{tag}
									</Chip>
								))}
								{event.data.eventTags && event.data.eventTags.length > 2 && (
									<Chip
										size="sm"
										variant="flat"
										className="bg-blue-100 text-blue-600 text-xs"
									>
										+{event.data.eventTags.length - 2}
									</Chip>
								)}
							</div>

							{/* Full-width View Details button - pushed to bottom */}
							<div className="mt-auto">
								<Button
									size="sm"
									variant="flat"
									color="primary"
									className="text-sm font-semibold w-full whitespace-nowrap px-4 py-2 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
									onClick={(e) => {
										e.stopPropagation();
										handleEventSelect();
									}}
								>
									View Details →
								</Button>
							</div>
						</CardBody>
					</Card>
					</div>
				);
			})}
		</div>
	);
}
