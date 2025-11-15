import React, { useEffect, useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Image,
	Link,
	Chip,
	Card,
	CardBody,
} from "@heroui/react";
import type { CollectionEntry } from "astro:content";
import tagsData from "../data/tags.json";
import {
	getLocationFromTags,
	getCostFromTags,
	getImageSrc,
	getProjectType,
} from "../utils/projectHelpers";

interface ProjectModalProps {
	isOpen: boolean;
	onClose: () => void;
	project: CollectionEntry<"projects"> | null;
}

// Categorize tags based on tags.json
function categorizeTags(projectTags: string[] | undefined) {
	if (!projectTags || projectTags.length === 0) return {};

	const categorized: Record<string, string[]> = {};
	const usedTags = new Set<string>();

	// Check each tag against all categories
	for (const [category, categoryTags] of Object.entries(tagsData.categories)) {
		const matchingTags = projectTags.filter((tag) =>
			categoryTags.some((catTag) => catTag.toLowerCase() === tag.toLowerCase())
		);

		if (matchingTags.length > 0) {
			categorized[category] = matchingTags;
			matchingTags.forEach((tag) => usedTags.add(tag.toLowerCase()));
		}
	}

	// Add remaining tags to "Other" category
	const otherTags = projectTags.filter(
		(tag) => !usedTags.has(tag.toLowerCase())
	);
	if (otherTags.length > 0) {
		categorized["Other"] = otherTags;
	}

	return categorized;
}

export default function ProjectModal({
	isOpen,
	onClose,
	project,
}: ProjectModalProps) {
	console.log('ProjectModal render - isOpen:', isOpen, 'project:', project?.data?.title);
	
	if (!project) {
		console.log('No project provided, returning null');
		return null;
	}

	const { data } = project;
	const projectSlug = project.id;
	const displayImage =
		getImageSrc(data.imageGif) ||
		getImageSrc(data.heroImage) ||
		"/assets/project-placeholder-1.jpg";
	const categorizedTags = categorizeTags(data.tags);

	console.log('Modal rendering - isOpen:', isOpen, 'project exists:', !!project);
	
	// Simple fallback modal if HeroUI Modal doesn't work
	if (isOpen && Boolean(project)) {
		return (
			<div
				className="fixed inset-0 z-[1002] flex items-center justify-center bg-black/70 backdrop-blur-sm"
				onClick={onClose}
			>
				<div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden m-4" onClick={(e) => e.stopPropagation()}>
					{/* Close button */}
					<button
						onClick={onClose}
						className="absolute top-4 right-4 z-[1003] bg-white rounded-full p-2 shadow-lg hover:bg-slate-100"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
					
					{/* Modal content */}
					<div className="overflow-y-auto max-h-[90vh] p-6">
						{displayImage && (
							<div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-lg mb-6">
								<Image
									src={displayImage}
									alt={data.title}
									className="w-full h-full object-cover"
									classNames={{
										wrapper: "w-full h-full",
									}}
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-t-lg" />
								<div className="absolute bottom-4 left-6 right-6 sm:bottom-6">
									<h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 drop-shadow-lg">
										{data.title}
									</h2>
								</div>
							</div>
						)}
						
						{!displayImage && (
							<h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
								{data.title}
							</h2>
						)}
						
						<p className="text-slate-700 leading-relaxed text-base mb-6">
							{data.description}
						</p>
						
						<div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
							<button
								onClick={onClose}
								className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
							>
								Close
							</button>
							<a
								href={`/projects/${projectSlug}`}
								onClick={onClose}
								className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-center"
							>
								View Full Project
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
	
	return (
		<Modal
			isOpen={isOpen && Boolean(project)}
			onClose={onClose}
			placement="center"
			size="5xl"
			scrollBehavior="inside"
			hideCloseButton={false}
			classNames={{
				backdrop: "bg-black/70 backdrop-blur-sm z-[1000]",
				base: "z-[1001] max-h-[90vh] bg-white shadow-2xl",
				wrapper: "z-[1002] overflow-y-auto",
				header: "border-b border-slate-200 bg-white",
				body: "py-6 px-6 bg-white",
				footer: "border-t border-slate-200 bg-white px-6 py-4",
				closeButton: "hover:bg-slate-100 active:bg-slate-200 rounded-lg",
			}}
			onOpenChange={(open) => console.log('Modal open change:', open)}
			motionProps={{
				variants: {
					enter: { opacity: 1, scale: 1, y: 0 },
					exit: { opacity: 0, scale: 0.95, y: 25 },
				},
				transition: {
					duration: 0.2,
					ease: "easeOut",
				},
				initial: "exit",
				animate: "enter",
				exit: "exit",
			}}
		>
			<ModalContent>
				{(onClose) => (
					<>
						{/* Modal header with image */}
						{displayImage && (
							<div className="relative h-64 sm:h-80 w-full overflow-hidden">
								<Image
									src={displayImage}
									alt={data.title}
									className="w-full h-full object-cover"
									classNames={{
										wrapper: "w-full h-full",
									}}
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
								<div className="absolute bottom-4 left-6 right-6 sm:bottom-6">
									<h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 drop-shadow-lg">
										{data.title}
									</h2>
									<div className="flex flex-wrap gap-2">
										{categorizedTags["School Level"]?.map((level) => (
											<Chip
												key={level}
												size="sm"
												variant="solid"
												color="primary"
												className="bg-blue-600 text-white border-none"
											>
												{level}
											</Chip>
										))}
										{categorizedTags["Sponsor"]?.map((sponsor) => (
											<Chip
												key={sponsor}
												size="sm"
												variant="flat"
												className="bg-white/90 backdrop-blur-sm text-slate-700 border border-white/20"
											>
												{sponsor}
											</Chip>
										))}
									</div>
								</div>
							</div>
						)}

						{!displayImage && (
							<ModalHeader className="px-6 pt-6 pb-0">
								<div className="w-full">
									<h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
										{data.title}
									</h2>
									<p className="mt-2 text-sm text-slate-500">
										Published on{" "}
										{new Date(data.pubDate).toLocaleDateString(undefined, {
											month: "short",
											day: "numeric",
											year: "numeric",
										})}
									</p>
								</div>
							</ModalHeader>
						)}

						<ModalBody>
							<div className="space-y-6">
								{displayImage && (
									<div className="px-6 pt-0">
										<p className="text-sm text-slate-500">
											Published on{" "}
											{new Date(data.pubDate).toLocaleDateString(undefined, {
												month: "short",
												day: "numeric",
												year: "numeric",
											})}
										</p>
									</div>
								)}

								{/* Description */}
								<div className="px-6">
									<p className="text-slate-700 leading-relaxed text-base">
										{data.description}
									</p>
								</div>

								{/* Quick info grid */}
								<div className="px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
									{data.estimated_time && (
										<div className="bg-slate-50 rounded-lg p-4">
											<div className="flex items-center gap-2 text-slate-500 mb-1">
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
												<span className="text-sm">Duration</span>
											</div>
											<p className="font-semibold text-slate-900">
												{data.estimated_time} min
											</p>
										</div>
									)}

									<div className="bg-slate-50 rounded-lg p-4">
										<div className="flex items-center gap-2 text-slate-500 mb-1">
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
													d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
												/>
											</svg>
											<span className="text-sm">Location</span>
										</div>
										<p className="font-semibold text-slate-900">
											{getLocationFromTags(data.tags)}
										</p>
									</div>

									<div className="bg-slate-50 rounded-lg p-4">
										<div className="flex items-center gap-2 text-slate-500 mb-1">
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
													d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
												/>
											</svg>
											<span className="text-sm">Audience</span>
										</div>
										<p className="font-semibold text-slate-900">
											{categorizedTags["School Level"]?.[0] || "N/A"}
										</p>
									</div>

									<div className="bg-slate-50 rounded-lg p-4">
										<div className="flex items-center gap-2 text-slate-500 mb-1">
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
													d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											<span className="text-sm">Cost</span>
										</div>
										<p className="font-semibold text-slate-900">
											{getCostFromTags(data.tags)}
										</p>
									</div>

									<div className="bg-slate-50 rounded-lg p-4">
										<div className="flex items-center gap-2 text-slate-500 mb-1">
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
													d="M12 8V4m0 4c-2.21 0-4 1.79-4 4H5l7 7 7-7h-3c0-2.21-1.79-4-4-4z"
												/>
											</svg>
											<span className="text-sm">Offering Type</span>
										</div>
										<p className="font-semibold text-slate-900">
											{getProjectType(data.tags)}
										</p>
									</div>
								</div>

								{/* Relevance */}
								{data.relevance && (
									<div className="px-6">
										<h3 className="text-lg font-semibold text-slate-900 mb-3">
											Relevance
										</h3>
										<p className="text-slate-700 leading-relaxed">
											{data.relevance}
										</p>
									</div>
								)}

								{/* Resources */}
								{data.links && (
									<div className="px-6">
										<h3 className="text-lg font-semibold text-slate-900 mb-3">
											Resources
										</h3>
										<div className="space-y-3">
											{data.links.lessonPlan && (
												<Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
													<CardBody className="p-4">
														<div className="flex flex-col sm:flex-row sm:items-start gap-4">
															<div className="p-2 bg-blue-100 rounded-lg self-start">
																<svg
																	className="w-6 h-6 text-blue-600"
																	fill="none"
																	stroke="currentColor"
																	viewBox="0 0 24 24"
																>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		strokeWidth={2}
																		d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
																	/>
																</svg>
															</div>
															<div className="flex-1">
																<h4 className="font-semibold text-slate-900 mb-1">
																	Lesson Plan
																</h4>
																<p className="text-sm text-slate-600 mb-3">
																	Comprehensive lesson plan with objectives and activities
																</p>
																<Button
																	as={Link}
																	href={data.links.lessonPlan}
																	isExternal
																	size="sm"
																	color="primary"
																	variant="flat"
																	className="text-blue-600 hover:bg-blue-50"
																>
																	Download Lesson Plan
																</Button>
															</div>
														</div>
													</CardBody>
												</Card>
											)}

											{data.links.materials && (
												<Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
													<CardBody className="p-4">
														<div className="flex flex-col sm:flex-row sm:items-start gap-4">
															<div className="p-2 bg-green-100 rounded-lg self-start">
																<svg
																	className="w-6 h-6 text-green-600"
																	fill="none"
																	stroke="currentColor"
																	viewBox="0 0 24 24"
																>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		strokeWidth={2}
																		d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
																	/>
																</svg>
															</div>
															<div className="flex-1">
																<h4 className="font-semibold text-slate-900 mb-1">
																	Materials & Instructions
																</h4>
																<p className="text-sm text-slate-600 mb-3">
																	All necessary materials and step-by-step instructions
																</p>
																<Button
																	as={Link}
																	href={data.links.materials}
																	isExternal
																	size="sm"
																	color="primary"
																	variant="flat"
																	className="text-blue-600 hover:bg-blue-50"
																>
																	View Materials
																</Button>
															</div>
														</div>
													</CardBody>
												</Card>
											)}
										</div>
									</div>
								)}

								{/* Tags by category */}
								{data.tags && data.tags.length > 0 && (
									<div className="px-6">
										<h3 className="text-lg font-semibold text-slate-900 mb-3">
											Tags
										</h3>
										<div className="space-y-4">
											{Object.entries(categorizedTags).map(
												([category, tags]) => (
													<div key={category}>
														<h4 className="font-medium text-slate-700 mb-2 text-sm">
															{category}
														</h4>
														<div className="flex flex-wrap gap-2">
															{tags.map((tag) => (
																<Chip
																	key={tag}
																	variant="flat"
																	className="bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors"
																>
																	{tag}
																</Chip>
															))}
														</div>
													</div>
												)
											)}
										</div>
									</div>
								)}
							</div>
						</ModalBody>

						{/* Modal footer */}
						<ModalFooter className="flex flex-col sm:flex-row gap-3 sm:gap-2">
							<Button
								color="default"
								variant="light"
								onPress={onClose}
								className="w-full sm:w-auto text-slate-600 hover:bg-slate-100"
							>
								Close
							</Button>
							<Button
								color="primary"
								as="a"
								href={`/projects/${projectSlug}`}
								onPress={onClose}
								className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium"
							>
								View Full Project
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
