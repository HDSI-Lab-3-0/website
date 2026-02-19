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
	const [selectedSchoolLevel, setSelectedSchoolLevel] = useState<Set<string>>(
		new Set([])
	);
	const [selectedLocation, setSelectedLocation] = useState<Set<string>>(new Set([]));
	const [selectedType, setSelectedType] = useState<Set<string>>(new Set([]));
	const [selectedSponsor, setSelectedSponsor] = useState<Set<string>>(new Set([]));
	const [selectedCost, setSelectedCost] = useState<Set<string>>(new Set([]));
	const [selectedOther, setSelectedOther] = useState<Set<string>>(new Set([]));

	// Helper function to check if a project's tags match any selected tags in a category
	const matchesCategory = (
		projectTags: string[],
		selectedTags: Set<string>
	): boolean => {
		if (selectedTags.size === 0) return true;
		return Array.from(selectedTags).some((selectedTag) =>
			projectTags.some((pt) => pt.toLowerCase() === selectedTag.toLowerCase())
		);
	};

	const filteredProjects = useMemo(() => {
		return projects.filter((project) => {
			const projectTags = project.data.tags || [];
			return (
				matchesCategory(projectTags, selectedSchoolLevel) &&
				matchesCategory(projectTags, selectedLocation) &&
				matchesCategory(projectTags, selectedType) &&
				matchesCategory(projectTags, selectedSponsor) &&
				matchesCategory(projectTags, selectedCost) &&
				matchesCategory(projectTags, selectedOther)
			);
		});
	}, [projects, selectedSchoolLevel, selectedLocation, selectedType, selectedSponsor, selectedCost, selectedOther]);

	// Update active filters count in the hero section
	useEffect(() => {
		const activeFiltersElement = document.getElementById("active-filters");
		if (activeFiltersElement) {
			const totalSelected =
				selectedSchoolLevel.size +
				selectedLocation.size +
				selectedType.size +
				selectedSponsor.size +
				selectedCost.size +
				selectedOther.size;
			activeFiltersElement.textContent = totalSelected.toString();
		}
	}, [selectedSchoolLevel, selectedLocation, selectedType, selectedSponsor, selectedCost, selectedOther]);

	return (
		<HeroUIProvider>
			<div className="projects-app">
				<ProjectFilters
					onFiltersChange={(
						schoolLevel,
						location,
						type,
						sponsor,
						cost,
						other
					) => {
						setSelectedSchoolLevel(schoolLevel);
						setSelectedLocation(location);
						setSelectedType(type);
						setSelectedSponsor(sponsor);
						setSelectedCost(cost);
						setSelectedOther(other);
					}}
					availableProjects={projects}
				/>

				<section className="projects-section">
					<div className="projects-section-header">
						<h2 className="projects-section-title">
							Available Projects
						</h2>
						<span className="projects-section-count">
							{filteredProjects.length} of {projects.length}
						</span>
					</div>

					<ProjectGrid projects={filteredProjects} />
				</section>
			</div>
		</HeroUIProvider>
	);
}
