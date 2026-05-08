import type { CollectionEntry } from "astro:content";
import { getImageSrc, getLocationFromTags, getLinkedEvent, getEventDisplayStatus, getEventStatusStyle, isEventActive } from "@/utils/projectHelpers.ts";

interface ProjectGridProps {
	projects: CollectionEntry<"projects">[];
	events: CollectionEntry<"events">[];
}

export default function ProjectGrid({ projects, events }: ProjectGridProps) {
	return (
		<div className="projects-grid">
			{projects.map((project) => {
				const displayImage =
					getImageSrc(project.data.imageGif) ||
					getImageSrc(project.data.heroImage) ||
					"";

				const linkedEvent = getLinkedEvent(project.data.event, events);
				const linkedEventStatus = linkedEvent ? getEventDisplayStatus(linkedEvent) : null;
				const eventStyle = linkedEventStatus ? getEventStatusStyle(linkedEventStatus) : null;

				return (
					<a
						key={project.id}
						href={`/projects/${project.id}`}
						className="project-card group"
					>
						{/* Card image */}
						<div className="project-card-image">
							{displayImage ? (
								<img
									src={displayImage}
									alt={project.data.title}
									className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
									loading="lazy"
								/>
							) : (
								<div
									className="w-full h-full bg-slate-200"
									aria-hidden
								/>
							)}
							{linkedEvent && eventStyle && (
								<div
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										window.location.href = `/events/${linkedEvent.id}`;
									}}
									className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
									style={{
										backgroundColor: eventStyle.text,
										color: '#ffffff',
									}}
								>
									<svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="flex-shrink-0">
										<circle cx="5" cy="5" r="4.5" fill="currentColor" opacity="0.8" />
										{linkedEventStatus === 'ongoing' && (
											<circle cx="5" cy="5" r="2.5" fill="currentColor" />
										)}
									</svg>
									<span>{isEventActive(linkedEventStatus ?? '') ? eventStyle.label : 'Event'}</span>
								</div>
							)}
						</div>

						{/* Card content */}
						<div className="project-card-content">
							<h3 className="project-card-title">
								{project.data.title}
							</h3>

							<p className="project-card-description">
								{project.data.description}
							</p>

							{/* Tags */}
							<div className="project-card-tags">
								{project.data.tags?.slice(0, 3).map((tag) => (
									<span key={tag} className="project-tag">
										{tag}
									</span>
								))}
								{project.data.tags && project.data.tags.length > 3 && (
									<span className="project-tag project-tag-more">
										+{project.data.tags.length - 3}
									</span>
								)}
							</div>

							{/* Meta row */}
							<div className="project-card-meta">
								<div className="project-meta-items">
									<span className="project-meta-item">
										<svg className="project-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
											<circle cx="12" cy="12" r="10"/>
											<polyline points="12,6 12,12 16,14"/>
										</svg>
										{project.data.estimated_time ? `${project.data.estimated_time} min` : "N/A"}
									</span>
									<span className="project-meta-item">
										<svg className="project-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
											<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
											<circle cx="12" cy="10" r="3"/>
										</svg>
										{getLocationFromTags(project.data.tags)}
									</span>
								</div>
								<span className="project-card-link">
									View Details
									<svg className="project-link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
										<line x1="5" y1="12" x2="19" y2="12"/>
										<polyline points="12,5 19,12 12,19"/>
									</svg>
								</span>
							</div>
						</div>
					</a>
				);
			})}
		</div>
	);
}
