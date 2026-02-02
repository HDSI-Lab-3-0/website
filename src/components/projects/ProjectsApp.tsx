import { useState, useMemo, useEffect } from "react";
import { HeroUIProvider } from "@heroui/react";
import type { CollectionEntry } from "astro:content";
import ProjectFilters from "@/components/projects/ProjectFilters.tsx";
import ProjectGrid from "@/components/projects/ProjectGrid.tsx";

interface ProjectsAppProps {
	projects: CollectionEntry<"projects">[];
}

export default function ProjectsApp({ projects }: ProjectsAppProps) {
	console.log("ProjectsApp component loaded with", projects.length, "projects");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

	return (
		<HeroUIProvider>
			<div className="flex flex-col gap-8">
				<ProjectFilters
					onFiltersChange={setSelectedTags}
					availableProjects={projects}
				/>

				<section className="flex-1 min-w-0 w-full">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
						<h2 className="text-2xl font-semibold text-slate-900">
							Available Projects
						</h2>
						<span className="text-sm text-slate-600">
							Showing {filteredProjects.length} of {projects.length} projects
						</span>
					</div>

					<ProjectGrid projects={filteredProjects} />
				</section>
			</div>
		</HeroUIProvider>
	);
}
