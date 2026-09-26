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
							<div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-4">
								<h2 className="break-words font-semibold text-gray-200 text-xl transition-colors duration-300 group-hover:text-green-300">
									{project.title}
								</h2>
								<p className="min-w-0 break-words font-mono text-gray-500 text-xs sm:text-right">
									{project.technologies.join(", ")}
								</p>
							</div>
							<p className="mt-2 max-w-full break-words text-gray-400 text-sm leading-relaxed sm:max-w-[95%]">
								{project.description.slice(0, 2).join(" ")}
							</p>
						</a>
					</div>
				))}
			</div>
		</div>
	);
}
