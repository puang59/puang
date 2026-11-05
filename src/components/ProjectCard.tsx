import { RiArrowRightUpLine } from "@remixicon/react";
import Image from "next/image";
import { type Project, isLive, projectCover, projectSlug } from "./Projects";
import { TechIcon } from "./TechIcon";
import TransitionLink from "./utils/TransitionLink";

export function ProjectStatus({ project }: { project: Project }) {
	const live = isLive(project);
	return (
		<span className="inline-flex items-center gap-1.5">
			<span className="relative flex h-1.5 w-1.5">
				{live && (
					<span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60 [animation-duration:2.4s]" />
				)}
				<span
					className={`relative h-1.5 w-1.5 rounded-full ${live ? "bg-emerald-400" : "bg-faint"}`}
				/>
			</span>
			{live ? "Live" : "Open Source"}
		</span>
	);
}

export function ProjectCard({
	project,
	from,
}: { project: Project; from?: "home" }) {
	const cover = projectCover(project);
	const stats = project.stats?.slice(0, 2) ?? [];

	return (
		<TransitionLink
			href={`/projects/${projectSlug(project)}${from ? `?from=${from}` : ""}`}
			className="group flex h-full flex-col"
		>
			<div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-raised ring-1 ring-line transition-shadow duration-500 ease-soft group-hover:ring-edge">
				{cover ? (
					<Image
						src={cover.src}
						alt={cover.alt}
						fill
						sizes="(min-width: 640px) 360px, 100vw"
						className="object-cover object-top opacity-80 transition-[transform,opacity] duration-700 ease-soft group-hover:scale-[1.03] group-hover:opacity-100"
					/>
				) : (
					<div className="hatch-rail flex h-full w-full items-center justify-center font-mono text-faint text-sm">
						{project.title}
					</div>
				)}
				<span className="absolute top-2 left-2 rounded-full bg-background/75 px-2 py-0.5 font-mono text-[10px] text-muted backdrop-blur">
					<ProjectStatus project={project} />
				</span>
				<span className="absolute top-2 right-2 flex h-6 w-6 translate-y-1 items-center justify-center rounded-full bg-foreground text-background opacity-0 transition-all duration-500 ease-soft group-hover:translate-y-0 group-hover:opacity-100">
					<RiArrowRightUpLine size={14} />
				</span>
			</div>
			<p className="mt-3 line-clamp-2 text-sm leading-relaxed">
				<span className="font-medium text-foreground">{project.title}</span>
				<span className="text-faint"> — </span>
				<span className="text-muted transition-colors duration-300 group-hover:text-foreground/80">
					{project.description[0]}
				</span>
			</p>
			<div className="mt-auto flex items-center justify-between gap-3 pt-3">
				{stats.length > 0 ? (
					<div className="flex min-w-0 flex-wrap gap-1">
						{stats.map((stat) => (
							<span
								key={stat}
								className="rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted ring-1 ring-line transition-colors duration-300 group-hover:text-foreground"
							>
								{stat}
							</span>
						))}
					</div>
				) : (
					<p className="min-w-0 truncate text-faint text-xs">
						{project.description[1]}
					</p>
				)}
				<div className="flex shrink-0 items-center gap-2 text-faint transition-colors duration-500 group-hover:text-muted">
					{project.technologies.slice(0, 4).map((tech) => (
						<span key={tech} title={tech}>
							<TechIcon name={tech} size={13} />
						</span>
					))}
				</div>
			</div>
		</TransitionLink>
	);
}
