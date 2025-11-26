import { Card, CardBody, Chip, Image, Button } from "@heroui/react";
import type { CollectionEntry } from "astro:content";
import {
	getImageSrc,
	formatEventDateTimeRange,
	getEventStatusBadgeProps,
	getEventLocation,
	getEventAudience,
	getEventDuration,
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
		<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
			{events.map((event) => {
				const displayImage =
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

				return (
					<Card
						key={event.id}
						isHoverable
						className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-blue-200 bg-white"
					>
						{/* Card header with image and status badge */}
						<div className="relative h-48 overflow-hidden">
							<Image
								src={displayImage}
								alt={event.data.eventName}
								className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
								classNames={{
									wrapper: "w-full h-full",
								}}
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
						</div>

						{/* Card body */}
						<CardBody className="p-5">
							<h3 className="text-xl font-semibold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
								{event.data.eventName}
							</h3>

							<p className="text-slate-600 text-sm mb-4 line-clamp-3">
								{event.data.eventDescription}
							</p>

							{/* Date and time */}
							<div className="flex items-center gap-2 mb-3 text-sm text-slate-600">
								<svg
									className="w-4 h-4 text-blue-500"
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
								<span className="truncate">{dateTimeRange}</span>
							</div>

							{/* Location and duration */}
							<div className="flex items-center justify-between mb-4 text-xs text-slate-500">
								<div className="flex items-center gap-1">
									<svg
										className="w-4 h-4"
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
									<span>{location}</span>
								</div>
								<div className="flex items-center gap-1">
									<svg
										className="w-4 h-4"
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
									<span>{duration}</span>
								</div>
							</div>

							{/* Tags row */}
							<div className="flex flex-wrap gap-2 mb-4">
								{event.data.eventTags?.slice(0, 2).map((tag) => (
									<Chip
										key={tag}
										size="sm"
										variant="flat"
										className="bg-blue-100 text-blue-600 text-xs"
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

							{/* Audience and action */}
							<div className="flex items-center justify-between">
								<span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
									{audience}
								</span>
								<Button
									size="sm"
									variant="flat"
									color="primary"
									className="text-xs font-medium group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
									onClick={handleEventSelect}
								>
									View Details →
								</Button>
							</div>
						</CardBody>
					</Card>
				);
			})}
		</div>
	);
}
