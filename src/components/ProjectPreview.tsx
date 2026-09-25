import Link from "next/link";
import { projectList } from "./Projects";

export default function ProjectPreview() {
	// Take top 4 projects
	const projects = projectList.slice(0, 4);

	return (
		<div className="mb-16 text-white">
			<div className="mb-8 flex items-center justify-between">
				<h1 className="font-bold text-2xl text-white">
					<span className="text-green-300">&gt;</span> projects
				</h1>
				<Link
					href="/projects"
					className="flex items-center gap-1 text-gray-500 text-sm transition-all duration-300 hover:text-green-300"
				>
					view all <span className="text-xs">→</span>
				</Link>
			</div>

			<div className="space-y-8">
				{projects.map((project) => (
					<div key={project.title} className="group">
						<a
							href={project.links[0]?.url}
							target="_blank"
							rel="noopener noreferrer"
							className="block"
						>
							<div className="flex items-baseline justify-between gap-4">
								<h2 className="truncate font-semibold text-gray-200 text-xl transition-colors duration-300 group-hover:text-green-300">
									{project.title}
								</h2>
								<p className="whitespace-nowrap font-mono text-gray-500 text-xs">
									{project.technologies.join(", ")}
								</p>
							</div>
							<p className="mt-2 max-w-[95%] text-gray-400 text-sm leading-relaxed">
								{project.description}
							</p>
						</a>
					</div>
				))}
			</div>
		</div>
	);
}
