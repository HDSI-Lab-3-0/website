import { Card, CardBody, Chip } from "@heroui/react";
import type { CollectionEntry } from "astro:content";
import { getImageSrc, getLocationFromTags } from "@/utils/projectHelpers.ts";

interface ProjectGridProps {
	projects: CollectionEntry<"projects">[];
	onProjectClick: (project: CollectionEntry<"projects">) => void;
}


export default function ProjectGrid({
	projects,
	onProjectClick,
}: ProjectGridProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
			{projects.map((project) => {
				const displayImage =
					getImageSrc(project.data.imageGif) ||
					getImageSrc(project.data.heroImage) ||
					"/assets/project-placeholder-1.jpg";
				const handleProjectSelect = () => {
					onProjectClick(project);
				};

				return (
					<Card
						key={project.id}
						isPressable
						isHoverable
						onPress={handleProjectSelect}
						role="button"
						className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-200 bg-white"
					>
						{/* Card header with image */}
						<div className="relative h-48 overflow-hidden">
							<img
								src={displayImage}
								alt={project.data.title}
								className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
							/>
						</div>

						{/* Card body */}
						<CardBody className="p-5">
							<h3 className="text-xl font-semibold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
								{project.data.title}
							</h3>

							<p className="text-slate-600 text-sm mb-4 line-clamp-3">
								{project.data.description}
							</p>

							{/* Tags row */}
							<div className="flex flex-wrap gap-2 mb-4">
								{project.data.tags?.slice(0, 3).map((tag) => (
									<Chip
										key={tag}
										size="sm"
										variant="flat"
										className="bg-slate-100 text-slate-600 text-xs"
									>
										{tag}
									</Chip>
								))}
								{project.data.tags && project.data.tags.length > 3 && (
									<Chip
										size="sm"
										variant="flat"
										className="bg-slate-100 text-slate-600 text-xs"
									>
										+{project.data.tags.length - 3}
									</Chip>
								)}
							</div>

							{/* Meta information */}
							<div className="flex items-center justify-between text-xs text-slate-500">
								<div className="flex items-center gap-4">
									<span className="flex items-center gap-1">
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
										{project.data.estimated_time
											? `${project.data.estimated_time} min`
											: "N/A"}
									</span>
									<span className="flex items-center gap-1">
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
										{getLocationFromTags(project.data.tags)}
									</span>
								</div>
								<span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
									View Details →
								</span>
							</div>
						</CardBody>
					</Card>
				);
			})}
		</div>
	);
}
