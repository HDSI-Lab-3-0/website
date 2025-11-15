import type { ImageMetadata } from "astro";

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
