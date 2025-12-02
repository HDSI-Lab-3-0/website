import type { ImageMetadata } from "astro";

export function formatEventDate(date: Date): string {
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(date);
}

export function formatEventTime(date: Date): string {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	}).format(date);
}

export function formatEventDateTimeRange(startDate: Date, endDate: Date): string {
	const startFormatted = formatEventDate(startDate);
	const endFormatted = formatEventDate(endDate);
	
	if (startFormatted === endFormatted) {
		return `${startFormatted} • ${formatEventTime(startDate)} - ${formatEventTime(endDate)}`;
	}
	
	return `${formatEventDate(startDate)} - ${formatEventDate(endDate)}`;
}

export function getEventStatusBadgeProps(status: string) {
	switch (status) {
		case "upcoming":
			return {
				color: "primary" as const,
				variant: "flat" as const,
				className: "bg-blue-100 text-blue-700 border-blue-200",
			};
		case "ongoing":
			return {
				color: "success" as const,
				variant: "flat" as const,
				className: "bg-green-100 text-green-700 border-green-200",
			};
		case "completed":
			return {
				color: "default" as const,
				variant: "flat" as const,
				className: "bg-gray-100 text-gray-700 border-gray-200",
			};
		case "cancelled":
			return {
				color: "danger" as const,
				variant: "flat" as const,
				className: "bg-red-100 text-red-700 border-red-200",
			};
		default:
			return {
				color: "default" as const,
				variant: "flat" as const,
				className: "bg-gray-100 text-gray-700 border-gray-200",
			};
	}
}

export function isEventUpcoming(startDate: Date, referenceDate?: Date): boolean {
	const now = referenceDate || new Date();
	return startDate > now;
}

export function isEventOngoing(startDate: Date, endDate: Date, referenceDate?: Date): boolean {
	const now = referenceDate || new Date();
	return startDate <= now && endDate >= now;
}

export function isEventPast(endDate: Date, referenceDate?: Date): boolean {
	const now = referenceDate || new Date();
	return endDate < now;
}

export function getEventStatus(startDate: Date, endDate: Date, referenceDate?: Date): string {
	const now = referenceDate || new Date();
	
	if (isEventOngoing(startDate, endDate, now)) {
		return "ongoing";
	} else if (isEventPast(endDate, now)) {
		return "past";
	} else {
		return "upcoming";
	}
}

export function getEventDuration(startDate: Date, endDate: Date): string {
	const diffMs = endDate.getTime() - startDate.getTime();
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffDays = Math.floor(diffHours / 24);
	
	if (diffDays > 0) {
		return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
	} else if (diffHours > 0) {
		return `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
	} else {
		return "Less than 1 hour";
	}
}

type EventImage = ImageMetadata | string | undefined;

export function getImageSrc(image: EventImage): string | undefined {
	if (!image) return undefined;
	return typeof image === "string" ? image : image.src;
}

export function getEventLocation(tags: string[] | undefined): string {
	if (!tags) return "Location TBD";

	const locations = ["in classroom", "out of classroom", "at UCSD", "online", "hybrid"];
	const found = tags.find((tag) =>
		locations.some((location) => tag.toLowerCase() === location.toLowerCase())
	);

	return found || "Location TBD";
}

export function getEventAudience(tags: string[] | undefined): string {
	if (!tags) return "General Audience";

	const audiences = ["K-12 Students", "K-12 Teachers", "UCSD Students", "UCSD Faculty", "General Public"];
	const found = tags.find((tag) =>
		audiences.some((audience) => tag.toLowerCase() === audience.toLowerCase())
	);

	return found || "General Audience";
}