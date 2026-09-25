import { ProjectCard } from "./ProjectCard";
import { projectList } from "./Projects";

export function ProjectCards() {
	return (
		<div className="my-10 flex flex-col gap-8">
			{projectList.map((project) => (
				<ProjectCard key={project.title} project={project} />
			))}
		</div>
	);
}
