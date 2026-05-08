import type { ImageMetadata } from "astro";
import type { CollectionEntry } from "astro:content";

export function getLocationFromTags(tags: string[] | undefined): string {
	if (!tags) return "Not specified";

	const locations = ["in classroom", "out of classroom", "at UCSD"];
	const found = tags.find((tag) =>
		locations.some((location) => tag.toLowerCase() === location.toLowerCase())
	);

	return found || "Not specified";
}

export function getCostFromTags(tags: string[] | undefined): string {
	if (!tags) return "Not specified";

	const costs = ["Free", "Paid", "Offers Sponsorship"];
	const found = tags.find((tag) =>
		costs.some((cost) => tag.toLowerCase() === cost.toLowerCase())
	);

	return found || "Not specified";
}

export function getProjectType(tags: string[] | undefined): string {
	if (!tags) return "Not specified";

	const types = [
		"Professional Development for Teachers",
		"Summer Day Camp",
		"Evening Workshops",
	];
	const found = tags.find((tag) =>
		types.some((type) => tag.toLowerCase() === type.toLowerCase())
	);

	return found || "Not specified";
}

type ProjectImage = ImageMetadata | string | undefined;

export function getImageSrc(image: ProjectImage): string | undefined {
	if (!image) return undefined;
	return typeof image === "string" ? image : image.src;
}

export function getLinkedEvent(
	eventSlug: string | undefined,
	allEvents: CollectionEntry<"events">[]
): CollectionEntry<"events"> | undefined {
	if (!eventSlug) return undefined;
	return allEvents.find((event) => event.id === eventSlug);
}

export function getEventDisplayStatus(
	event: CollectionEntry<"events">
): "upcoming" | "ongoing" | "completed" | "cancelled" {
	const { eventStatus, eventDateStart, eventDateEnd, eventDateLabel } = event.data;

	if (eventDateLabel) {
		return eventStatus;
	}

	const now = new Date();
	if (eventDateStart <= now && eventDateEnd >= now) {
		return "ongoing";
	} else if (eventDateEnd < now) {
		return "completed";
	} else {
		return "upcoming";
	}
}

export function isEventActive(status: string): boolean {
	return status === "upcoming" || status === "ongoing";
}

export function getEventStatusStyle(status: string): {
	border: string;
	bg: string;
	text: string;
	icon: string;
	label: string;
} {
	switch (status) {
		case "ongoing":
			return {
				border: "#16a34a",
				bg: "#f0fdf4",
				text: "#166534",
				icon: "live",
				label: "Live Event",
			};
		case "upcoming":
			return {
				border: "#2563eb",
				bg: "#eff6ff",
				text: "#1e40af",
				icon: "upcoming",
				label: "Upcoming Event",
			};
		case "completed":
			return {
				border: "#94a3b8",
				bg: "#f8fafc",
				text: "#475569",
				icon: "completed",
				label: "Past Event",
			};
		case "cancelled":
			return {
				border: "#94a3b8",
				bg: "#f8fafc",
				text: "#94a3b8",
				icon: "cancelled",
				label: "Cancelled",
			};
		default:
			return {
				border: "#94a3b8",
				bg: "#f8fafc",
				text: "#475569",
				icon: "event",
				label: "Event",
			};
	}
}
