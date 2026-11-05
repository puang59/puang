import { RiArrowRightUpLine } from "@remixicon/react";
import { ProjectCards } from "./ProjectCards";
import { projectList } from "./Projects";
import { Section } from "./frame";
import TransitionLink from "./utils/TransitionLink";

export default function ProjectPreview() {
	return (
		<Section id="projects" index="03" title="Projects">
			<ProjectCards projects={projectList.slice(0, 4)} from="home" />
			<div className="mt-10 flex justify-center">
				<TransitionLink href="/projects" className="group btn btn-secondary">
					View all
					<RiArrowRightUpLine
						size={14}
						className="group-hover:-translate-y-px transition-transform duration-300 ease-soft group-hover:translate-x-px"
					/>
				</TransitionLink>
			</div>
		</Section>
	);
}
