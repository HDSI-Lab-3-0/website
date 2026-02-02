import { useEffect, useState } from "react";
import { Card, CardBody, Chip, Button } from "@heroui/react";
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
		<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 overflow-hidden">
			{events.map((event) => {
				const displayImage =
					getImageSrc(event.data.eventImage) ||
					getImageSrc(event.data.imageGif) ||
					getImageSrc(event.data.heroImage) ||
					"/assets/project-placeholder-1.jpg";

				const handleEventSelect = () => {
					onEventClick(event);
				};

				const dateTimeRange = formatEventDateTimeRange(
					event.data.eventDateStart,
					event.data.eventDateEnd
				);
				const location = event.data.eventLocation?.trim() || getEventLocation(event.data.eventTags);
				const audience = event.data.eventFor?.trim() || getEventAudience(event.data.eventTags);
				const duration = getEventDuration(event.data.eventDateStart, event.data.eventDateEnd);
					const tags = event.data.eventTags ?? [];

				const statusLabel = getEventStatusLabel(event.data.eventDateStart, event.data.eventDateEnd, referenceDate);
				let computedStatus = getEventStatus(event.data.eventDateStart, event.data.eventDateEnd, referenceDate);
				if (computedStatus === "past") {
					computedStatus = "completed";
				}
				const isOngoing = computedStatus === "ongoing";
				const isPast = computedStatus === "completed";
				const statusBadgeProps = getEventStatusBadgeProps(computedStatus);

				// Card treatment changes subtly based on event state
				const getCardStyling = () => {
					if (isOngoing) {
						return "border-emerald-200 shadow-sm shadow-emerald-100/70";
					} else if (isPast) {
						return "border-slate-200 shadow-sm";
					} else {
						return "border-blue-200 shadow-sm shadow-blue-100/70";
					}
				};

				const cardStyling = getCardStyling();
				const eventStateLabel = isOngoing ? "Happening now" : isPast ? "Past event" : "Upcoming";
				const statusBadgeLabel =
					computedStatus === "ongoing"
						? "Ongoing"
						: computedStatus === "completed"
						? "Completed"
						: "Upcoming";

				const detailItems = [
					{ Icon: CalendarDays, label: dateTimeRange },
					{ Icon: MapPin, label: location },
					{ Icon: Clock3, label: duration },
				].filter(({ label }) => Boolean(label));

				return (
						<div
							key={event.id}
							className={`group relative cursor-pointer transition-all duration-200 hover:-translate-y-1 rounded-2xl bg-white border ${cardStyling}`}
							onClick={handleEventSelect}
						>
						<Card
							isHoverable={false}
							className="border-0 bg-transparent shadow-none"
						>
							{/* Card header with compact image */}
							<div className="relative h-48 overflow-hidden rounded-t-2xl">
								<img
									src={displayImage}
									alt={event.data.eventName}
									className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
									loading="lazy"
								/>
								<div className="absolute inset-0 bg-black/35" />
								<div className="absolute top-1.5 right-1.5 flex items-center gap-1">
									<Chip size="sm" {...statusBadgeProps} className="backdrop-blur bg-black/30 text-white border-white/30">
										{statusBadgeLabel}
									</Chip>
									{isOngoing && (
										<Chip
											size="sm"
											color="success"
											variant="solid"
											className="animate-pulse font-semibold"
										>
											Live
										</Chip>
									)}
								</div>
								<div className="absolute bottom-2 left-3 text-white">
									<p className="text-[9px] uppercase tracking-[0.15em] text-white/80 mb-0.5">{eventStateLabel}</p>
									<p className="font-semibold text-xs leading-tight max-w-[85%] truncate">{dateTimeRange}</p>
								</div>
							</div>

							{/* Card body */}
								<CardBody className="px-4 py-3.5 flex flex-col overflow-hidden gap-3">
									{/* Status tag prominently displayed */}
									<div className="mb-1">
										<Chip size="sm" {...statusBadgeProps} className="font-semibold text-xs px-3 py-1">
											{statusLabel}
										</Chip>
									</div>
									<div className="flex flex-col gap-3 flex-grow">
										<h3 className="text-base font-semibold text-slate-900 line-clamp-2 group-hover:text-blue-700 transition-colors leading-tight">
										{event.data.eventName}
									</h3>

									<p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
										{event.data.eventDescription}
									</p>

									{/* Event For row - dedicated row above date/time */}
									{audience && (
										<div className="flex items-center gap-1.5 min-w-0 py-0.5">
											<div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-purple-500 bg-white flex-shrink-0">
												<Users className="w-3 h-3" strokeWidth={2} />
											</div>
											<span className="text-xs text-slate-700 leading-tight break-words">{audience}</span>
										</div>
									)}

									{/* Date/Time/Location details */}
									<div className="space-y-1 text-xs text-slate-700">
										{detailItems.map(({ Icon, label }, index) => (
											<div key={`${label}-${index}`} className="flex items-center gap-1.5 min-w-0 py-0.5">
												<div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-blue-500 bg-white flex-shrink-0">
													<Icon className="w-3 h-3" strokeWidth={2} />
												</div>
												<span className="leading-tight truncate">{label}</span>
											</div>
										))}
									</div>

									{/* Tags - optimized for better display */}
									<div className="flex flex-wrap gap-1 items-start">
										{tags.map((tag) => (
											<Chip
												key={tag}
												size="sm"
												variant="flat"
												className="bg-slate-100 text-slate-600 text-[9px] font-semibold uppercase tracking-wide px-2 py-0.5 flex-shrink-0"
												style={{ maxWidth: 'fit-content' }}
												title={tag}
											>
												<span className="whitespace-nowrap block leading-tight">
													{tag}
												</span>
											</Chip>
										))}
									</div>
								</div>

								<div className="mt-auto pt-4 flex items-center gap-3 flex-shrink-0">
									<div className="text-[9px] text-slate-500 uppercase tracking-[0.3em]">Details</div>
									<div className="h-px flex-1 bg-slate-200" />
									<Button
										size="sm"
										variant="shadow"
										color="primary"
										className="px-4 py-2 text-xs font-semibold shadow-md min-w-[90px]"
										onPress={() => {
											handleEventSelect();
										}}
									>
										View details
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