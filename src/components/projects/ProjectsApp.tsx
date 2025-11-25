import { useState, useMemo, useCallback, useEffect } from "react";
import { HeroUIProvider } from "@heroui/react";
import type { CollectionEntry } from "astro:content";
import ProjectFilters from "@/components/projects/ProjectFilters.tsx";
import ProjectGrid from "@/components/projects/ProjectGrid.tsx";
import ProjectModal from "@/components/projects/ProjectModal.tsx";

interface ProjectsAppProps {
	projects: CollectionEntry<"projects">[];
}

export default function ProjectsApp({ projects }: ProjectsAppProps) {
	console.log('ProjectsApp component loaded with', projects.length, 'projects');
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [selectedProject, setSelectedProject] =
		useState<CollectionEntry<"projects"> | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const activeFiltersElement = document.getElementById("active-filters");
		if (activeFiltersElement) {
			activeFiltersElement.textContent = selectedTags.length.toString();
		}
	}, [selectedTags]);

	const filteredProjects = useMemo(() => {
		if (selectedTags.length === 0) {
			return projects;
		}

		return projects.filter((project) => {
			const projectTags = project.data.tags || [];
			return selectedTags.some((tag) =>
				projectTags.some((pt) => pt.toLowerCase() === tag.toLowerCase())
			);
		});
	}, [projects, selectedTags]);

	const handleProjectClick = useCallback((project: CollectionEntry<"projects">) => {
		setSelectedProject(project);
		setIsModalOpen(true);
	}, []);

	const handleModalClose = useCallback(() => {
		setIsModalOpen(false);
		// Delay clearing the project to avoid flicker while the modal closes
		setTimeout(() => setSelectedProject(null), 200);
	}, []);

	return (
		<HeroUIProvider>
			<div className="flex flex-col lg:flex-row gap-10 items-start">
				<aside className="w-full lg:w-64 lg:flex-none lg:sticky lg:top-24 lg:h-fit lg:z-10">
					<ProjectFilters
						onFiltersChange={setSelectedTags}
						availableProjects={projects}
					/>
				</aside>

				<section className="flex-1 min-w-0 w-full">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
						<h2 className="text-2xl font-semibold text-slate-900">Available Projects</h2>
						<span className="text-sm text-slate-600">
							Showing {filteredProjects.length} of {projects.length} projects
						</span>
					</div>

					<ProjectGrid projects={filteredProjects} onProjectClick={handleProjectClick} />
				</section>

				<ProjectModal
					isOpen={isModalOpen}
					onClose={handleModalClose}
					project={selectedProject}
				/>
			</div>
		</HeroUIProvider>
	);
}
