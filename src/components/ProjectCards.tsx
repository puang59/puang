import { ProjectCard } from "./ProjectCard";
import type { Project } from "./Projects";
import Reveal from "./Reveal";

export function ProjectCards({
	projects,
	from,
}: { projects: Project[]; from?: "home" }) {
	return (
		<div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2">
			{projects.map((project, i) => (
				<Reveal key={project.title} delay={(i % 2) * 0.08} className="h-full">
					<ProjectCard project={project} from={from} />
				</Reveal>
			))}
		</div>
	);
}
