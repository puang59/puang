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

// GitHub Linguist language colors
const languageColors: Record<string, string> = {
	TypeScript: "#3178c6",
	JavaScript: "#f1e05a",
	Python: "#3572a5",
	Go: "#00add8",
	Rust: "#dea584",
	Astro: "#ff5a03",
	C: "#555555",
};

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
		<div className="group relative flex flex-col border border-zinc-800 bg-black/40 p-6 sm:p-8">
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

			<div className="mb-3 flex items-start justify-between gap-3">
				<h3 className="font-bold text-white text-xl transition-colors duration-300 group-hover:text-green-300">
					{project.title}
				</h3>
				{primary &&
					(() => {
						const Icon = linkIcons[primary.type];
						return (
							<span className="mt-1.5 flex shrink-0 items-center gap-1 text-[11px] text-gray-500 uppercase tracking-wide">
								<Icon size={13} />
								{primary.label}
							</span>
						);
					})()}
			</div>

			<ul className="mb-4 max-w-3xl space-y-1.5 text-gray-400 text-sm leading-relaxed sm:text-[15px]">
				{project.description.map((point) => (
					<li key={point} className="flex gap-2.5">
						<span className="mt-[0.45em] h-1 w-1 shrink-0 bg-green-300/70" />
						<span>{point}</span>
					</li>
				))}
			</ul>

			<div className="mb-4 flex flex-wrap gap-1.5">
				{project.technologies.map((tech) => (
					<span
						key={tech}
						className="border border-zinc-800 px-2.5 py-1 text-[11px] text-gray-400"
					>
						{tech}
					</span>
				))}
			</div>

			{project.stats && project.stats.length > 0 && (
				<p className="mb-4 text-green-300/80 text-xs sm:text-sm">
					{project.stats.join("  ·  ")}
				</p>
			)}

			{project.media.length > 0 && (
				<div className="relative z-10 mb-4">
					<MediaCarousel media={project.media} title={project.title} />
				</div>
			)}

			{(project.links.length > 0 || project.languages.length > 0) && (
				<div className="relative z-10 mt-auto flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-zinc-800/80 border-t pt-4">
					<div className="flex flex-wrap items-center gap-x-5 gap-y-2">
						{project.links.map((link) => {
							const Icon = linkIcons[link.type];
							return (
								<a
									key={link.url}
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-1.5 text-gray-500 text-xs transition-colors duration-300 hover:text-green-300 sm:text-sm"
								>
									<Icon size={14} />
									{link.label}
								</a>
							);
						})}
					</div>

					{project.languages.length > 0 && (
						<div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
							{project.languages.map((language) => (
								<span
									key={language}
									className="flex items-center gap-1.5 text-gray-500 text-xs"
								>
									<span
										aria-hidden="true"
										className="h-2.5 w-2.5 shrink-0 rounded-full"
										style={{
											backgroundColor: languageColors[language] ?? "#8b949e",
										}}
									/>
									{language}
								</span>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
