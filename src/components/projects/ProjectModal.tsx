import {
	Modal,
	ModalContent,
	Button,
	Image,
} from "@heroui/react";
import type { CollectionEntry } from "astro:content";
import {
	getLocationFromTags,
	getCostFromTags,
	getImageSrc,
	getProjectType,
} from "../../utils/projectHelpers";

interface ProjectModalProps {
	isOpen: boolean;
	onClose: () => void;
	project: CollectionEntry<"projects"> | null;
}


export default function ProjectModal({
	isOpen,
	onClose,
	project,
}: ProjectModalProps) {
	// Only render modal content when both isOpen is true and project exists
	if (!isOpen || !project) {
		return null;
	}

	const { data } = project;
	const projectSlug = project.id;
	const displayImage =
		getImageSrc(data.imageGif) ||
		getImageSrc(data.heroImage) ||
		"/assets/project-placeholder-1.jpg";

	return (
		<Modal
			isOpen={isOpen && Boolean(project)}
			onClose={onClose}
			placement="center"
			size="3xl"
			scrollBehavior="inside"
			hideCloseButton={false}
			classNames={{
				backdrop: "bg-black/70 backdrop-blur-sm z-[1000]",
				base: "z-[1001] max-h-[90vh] bg-white shadow-2xl rounded-3xl modal-content flex flex-col border border-slate-200/50",
				wrapper: "z-[1002] overflow-y-auto",
				header: "border-b border-slate-200 bg-white p-0 rounded-t-3xl",
				body: "py-0 px-6 bg-white flex-1 overflow-y-auto",
				footer: "border-t border-slate-200 bg-white px-6 py-4 sticky bottom-0 rounded-b-3xl",
				closeButton: "hover:bg-slate-100 active:bg-slate-200 rounded-full absolute top-4 right-4 z-10 transition-all duration-200",
			}}
		>
			<ModalContent>
				{(onClose) => (
					<div className="flex flex-col h-full max-h-[90vh]">
						{/* Header with Hero Image */}
						<div className="flex-shrink-0">
							{displayImage && (
								<div className="relative h-64 sm:h-80 w-full bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-3xl">
									<Image
										src={displayImage}
										alt={data.title}
										className="max-w-full max-h-full object-contain"
										classNames={{
											wrapper: "flex items-center justify-center w-full h-full",
										}}
									/>
								</div>
							)}
						</div>

						{/* Scrollable Content */}
						<div className="flex-1 overflow-y-auto">
							<div className="p-6 sm:p-8">
								{/* Title Section */}
								<div className="mb-6">
									<h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
										{data.title}
									</h2>
								</div>

								{/* Description */}
								<div className="mb-6">
									<p className="text-lg text-slate-700 leading-relaxed">
										{data.description}
									</p>
								</div>

								{/* Compact Inline Stats Row */}
								<div className="flex flex-wrap gap-4 mb-6 text-sm">
									{data.estimated_time && (
										<div className="flex items-center gap-1.5 text-blue-700">
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
											<span className="font-medium">Duration:</span>
											<span className="font-semibold">{data.estimated_time} min</span>
										</div>
									)}

									<div className="flex items-center gap-1.5 text-green-700">
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
										</svg>
										<span className="font-medium">Location:</span>
										<span className="font-semibold">{getLocationFromTags(data.tags)}</span>
									</div>

									<div className="flex items-center gap-1.5 text-purple-700">
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										<span className="font-medium">Cost:</span>
										<span className="font-semibold">{getCostFromTags(data.tags)}</span>
									</div>

									<div className="flex items-center gap-1.5 text-teal-700">
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8V4m0 4c-2.21 0-4 1.79-4 4H5l7 7 7-7h-3c0-2.21-1.79-4-4-4z" />
										</svg>
										<span className="font-medium">Type:</span>
										<span className="font-semibold">{getProjectType(data.tags)}</span>
									</div>
								</div>
					
								<p className="text-sm text-slate-500 mb-6">
									Published on {new Date(data.pubDate).toLocaleDateString(undefined, {
										month: "long",
										day: "numeric",
										year: "numeric",
									})}
								</p>
					
								{/* Relevance Section */}
								{data.relevance && (
									<div className="mb-2">
										<h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
											<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
											</svg>
											Relevance
										</h3>
										<div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
											<p className="text-slate-700 leading-relaxed text-sm mb-0" style={{marginBottom: '0'}}>
												{data.relevance}
											</p>
										</div>
									</div>
								)}

								{/* Resources Section */}
								{data.links && (
									<div className="mb-6">
										<h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
											<svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
											</svg>
											Resources
										</h3>
										<div className="space-y-3">
											{data.links.lessonPlan && (
												<div className="bg-blue-50 border border-blue-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200">
													<div className="flex items-start gap-3">
														<div className="p-2 bg-blue-100 rounded-xl">
															<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
															</svg>
														</div>
														<div className="flex-1">
															<h4 className="font-semibold text-slate-900 mb-1">Lesson Plan</h4>
															<p className="text-slate-600 mb-2 text-sm">Comprehensive lesson plan with objectives and activities</p>
															<a
																href={data.links.lessonPlan}
																target="_blank"
																rel="noopener noreferrer"
																className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 font-medium text-sm transition-colors"
															>
																Download
																<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
																</svg>
															</a>
														</div>
													</div>
												</div>
											)}

											{data.links.materials && (
												<div className="bg-green-50 border border-green-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200">
													<div className="flex items-start gap-3">
														<div className="p-2 bg-green-100 rounded-xl">
															<svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
															</svg>
														</div>
														<div className="flex-1">
															<h4 className="font-semibold text-slate-900 mb-1">Materials & Instructions</h4>
															<p className="text-slate-600 mb-2 text-sm">All necessary materials and step-by-step instructions</p>
															<a
																href={data.links.materials}
																target="_blank"
																rel="noopener noreferrer"
																className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 font-medium text-sm transition-colors"
															>
																View
																<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
																</svg>
															</a>
														</div>
													</div>
												</div>
											)}
										</div>
									</div>
								)}

							</div>
						</div>

						{/* Sticky Footer with Action Buttons */}
						<div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 rounded-b-3xl">
							<div className="flex flex-col sm:flex-row gap-3">
								<Button
									color="default"
									variant="light"
									onPress={onClose}
									className="w-full sm:w-auto text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-200"
								>
									Close
								</Button>
								<Button
									as="a"
									href={`/projects/${projectSlug}`}
									onPress={onClose}
									className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 !text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
								>
									View Full Project
								</Button>
							</div>
						</div>
					</div>
				)}
			</ModalContent>
		</Modal>
	);
}
