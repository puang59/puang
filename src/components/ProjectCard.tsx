import {
	RiArticleLine,
	RiBox3Fill,
	RiExternalLinkLine,
	RiGithubFill,
	RiNpmjsFill,
	RiPlayCircleFill,
} from "@remixicon/react";
import { MediaCarousel } from "./MediaCarousel";
import type { Project } from "./Projects";

const linkIcons = {
	live: RiExternalLinkLine,
	demo: RiPlayCircleFill,
	github: RiGithubFill,
	npm: RiNpmjsFill,
	pypi: RiBox3Fill,
	blog: RiArticleLine,
};

export function ProjectCard({ project }: { project: Project }) {
	const primary = project.links[0];

	return (
		<div className="group relative flex flex-col rounded-sm border border-zinc-800 bg-black/40 p-5 transition-colors duration-500 hover:border-green-300/60 sm:p-6">
			{primary && (
				<a
					href={primary.url}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`Open ${project.title}`}
					className="absolute inset-0 z-0"
				>
					<span className="sr-only">Open {project.title}</span>
				</a>
			)}

			<div className="mb-1.5 flex items-start justify-between gap-3">
				<h3 className="font-bold text-lg text-white transition-colors duration-300 group-hover:text-green-300">
					{project.title}
				</h3>
				{primary &&
					(() => {
						const Icon = linkIcons[primary.type];
						return (
							<span className="mt-1.5 flex shrink-0 items-center gap-1 text-[10px] text-gray-500 uppercase tracking-wide">
								<Icon size={12} />
								{primary.label}
							</span>
						);
					})()}
			</div>

			<p className="mb-3 line-clamp-2 text-gray-400 text-sm leading-relaxed">
				{project.description}
			</p>

			<div className="mb-3 flex flex-wrap gap-1.5">
				{project.technologies.map((tech) => (
					<span
						key={tech}
						className="rounded-full border border-zinc-800 px-2 py-0.5 text-[11px] text-gray-400 transition-colors duration-500 group-hover:border-green-300/30"
					>
						{tech}
					</span>
				))}
			</div>

			{project.stats && project.stats.length > 0 && (
				<p className="mb-3 text-green-300/80 text-xs">
					{project.stats.join("  ·  ")}
				</p>
			)}

			{project.media.length > 0 && (
				<div className="relative z-10 mb-3">
					<MediaCarousel media={project.media} title={project.title} />
				</div>
			)}

			{project.links.length > 0 && (
				<div className="relative z-10 mt-auto flex items-center gap-4 pt-1">
					{project.links.map((link) => {
						const Icon = linkIcons[link.type];
						return (
							<a
								key={link.url}
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-1 text-gray-500 text-xs transition-colors duration-300 hover:text-green-300"
							>
								<Icon size={13} />
								{link.label}
							</a>
						);
					})}
				</div>
			)}
		</div>
	);
}
