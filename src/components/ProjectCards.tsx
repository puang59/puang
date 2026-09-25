import { ProjectCard } from "./ProjectCard";
import { projectList } from "./Projects";

export function ProjectCards() {
	return (
		<div className="my-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
			{projectList.map((project) => (
				<ProjectCard key={project.title} project={project} />
			))}
		</div>
	);
}
