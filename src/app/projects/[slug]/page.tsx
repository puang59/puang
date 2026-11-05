import {
	RiArrowLeftLine,
	RiArrowRightLine,
	RiArticleLine,
	RiBox3Line,
	RiGithubFill,
	RiGlobalLine,
	RiNpmjsFill,
	RiPlayCircleLine,
} from "@remixicon/react";
import { notFound } from "next/navigation";
import Footer from "~/components/Footer";
import JsonLd from "~/components/JsonLd";
import { MediaCarousel } from "~/components/MediaCarousel";
import PageHeader from "~/components/PageHeader";
import { ProjectStatus } from "~/components/ProjectCard";
import { KeepFromLink, ProjectBackLink } from "~/components/ProjectNav";
import {
	type ProjectLink,
	getProject,
	projectList,
	projectSlug,
} from "~/components/Projects";
import Reveal from "~/components/Reveal";
import Rise from "~/components/Rise";
import { TechPill } from "~/components/TechIcon";
import TweetCard from "~/components/TweetCard";
import { Frame, Section } from "~/components/frame";
import { ogImage, site } from "~/lib/site";

const linkMeta: Record<
	ProjectLink["type"],
	{ icon: typeof RiGithubFill; label?: string }
> = {
	live: { icon: RiGlobalLine, label: "Website" },
	demo: { icon: RiPlayCircleLine },
	github: { icon: RiGithubFill },
	npm: { icon: RiNpmjsFill },
	pypi: { icon: RiBox3Line },
	blog: { icon: RiArticleLine },
};

type Params = { slug: string };

// Shortens text at a word boundary so meta descriptions stay within ~160 chars.
const clip = (text: string, max: number) =>
	text.length <= max
		? text
		: `${text.slice(0, text.lastIndexOf(" ", max - 1))}…`;

export function generateStaticParams() {
	return projectList.map((project) => ({ slug: projectSlug(project) }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<Params>;
}) {
	const project = getProject((await params).slug);
	if (!project) return;
	const slug = projectSlug(project);
	const summary = project.description[0] ?? project.overview;
	const position = projectList.indexOf(project) + 1;
	const image = ogImage({
		title: project.title,
		subtitle: summary,
		kicker: `project · ${String(position).padStart(2, "0")} / ${String(projectList.length).padStart(2, "0")}`,
	});
	const title = `${project.title}: ${summary.replace(/\.$/, "")}`;
	return {
		title,
		description: clip(project.overview, 158),
		keywords: [project.title, ...project.technologies, ...project.languages],
		alternates: { canonical: `/projects/${slug}` },
		openGraph: {
			title,
			description: summary,
			url: `/projects/${slug}`,
			type: "article",
			images: [{ url: image, width: 1200, height: 630, alt: project.title }],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description: summary,
			creator: site.twitter,
			images: [image],
		},
	};
}

export default async function ProjectPage({
	params,
}: {
	params: Promise<Params>;
}) {
	const project = getProject((await params).slug);
	if (!project) notFound();

	const index = projectList.indexOf(project);
	const prev =
		projectList[(index - 1 + projectList.length) % projectList.length];
	const next = projectList[(index + 1) % projectList.length];

	const notes = project.description.slice(1);
	const showcase = project.media.filter((item) => item.type !== "tweet");
	const tweets = project.media.flatMap((item) =>
		item.type === "tweet" ? [item.id] : [],
	);
	// Section numbers follow whichever optional sections this project has.
	let count = 0;
	const nextIndex = () => String(++count).padStart(2, "0");

	return (
		<Frame>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "SoftwareSourceCode",
					name: project.title,
					description: project.overview,
					url: `${site.url}/projects/${projectSlug(project)}`,
					codeRepository: project.links.find((link) => link.type === "github")
						?.url,
					programmingLanguage: project.languages,
					keywords: project.technologies.join(", "),
					author: { "@type": "Person", name: site.name, url: site.url },
				}}
			/>
			<PageHeader
				backLink={<ProjectBackLink />}
				trail={`${String(index + 1).padStart(2, "0")} / ${String(projectList.length).padStart(2, "0")}`}
			/>

			<Section className="px-5 pt-10 pb-8 sm:px-8">
				<Rise delay={0.06}>
					<h1 className="font-semibold text-[28px] text-foreground tracking-tight">
						{project.title}
					</h1>
					<p className="mt-3 text-[15px] text-muted leading-relaxed">
						{project.overview}
					</p>
				</Rise>

				<Rise delay={0.12}>
					<dl className="mt-8 space-y-2.5 text-sm">
						<div className="grid grid-cols-[96px_1fr] items-baseline gap-3">
							<dt className="font-mono text-[11px] text-faint">status</dt>
							<dd className="text-muted">
								<ProjectStatus project={project} />
							</dd>
						</div>
						<div className="grid grid-cols-[96px_1fr] items-baseline gap-3">
							<dt className="font-mono text-[11px] text-faint">languages</dt>
							<dd className="text-muted">{project.languages.join(", ")}</dd>
						</div>
						{project.links.length > 0 && (
							<div className="grid grid-cols-[96px_1fr] items-baseline gap-3">
								<dt className="font-mono text-[11px] text-faint">links</dt>
								<dd className="flex flex-wrap gap-x-4 gap-y-1">
									{project.links.map((link) => {
										const { icon: Icon, label } = linkMeta[link.type];
										return (
											<a
												key={link.url}
												href={link.url}
												target="_blank"
												rel="noopener noreferrer"
												className="group inline-flex items-center gap-1.5 text-foreground transition-colors duration-300 hover:text-white"
											>
												<Icon size={14} className="text-faint" />
												<span className="underline decoration-edge underline-offset-4 transition-colors duration-300 group-hover:decoration-foreground">
													{label ?? link.label}
												</span>
											</a>
										);
									})}
								</dd>
							</div>
						)}
					</dl>
				</Rise>
			</Section>

			{showcase.length > 0 && (
				<Section divider={false} className="px-3 pb-10 sm:px-5">
					<Rise delay={0.16}>
						<MediaCarousel media={showcase} title={project.title} />
					</Rise>
				</Section>
			)}

			{notes.length > 0 && (
				<Section divider="line" index={nextIndex()} title="Highlights">
					<Reveal>
						<ul className="space-y-2.5 text-[15px] text-muted leading-relaxed">
							{notes.map((point) => (
								<li key={point} className="flex gap-2.5">
									<span className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-faint" />
									<span>{point}</span>
								</li>
							))}
						</ul>
					</Reveal>
				</Section>
			)}

			{project.stats && project.stats.length > 0 && (
				<Section divider="line" index={nextIndex()} title="Numbers">
					<Reveal className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
						{project.stats.map((stat) => {
							const [value, ...rest] = stat.split(" ");
							return (
								<div key={stat}>
									<p className="font-medium text-foreground text-lg tabular-nums">
										{value}
									</p>
									<p className="text-faint text-xs">{rest.join(" ")}</p>
								</div>
							);
						})}
					</Reveal>
				</Section>
			)}

			{tweets.length > 0 && (
				<Section divider="line" index={nextIndex()} title="On X">
					<Reveal className="space-y-3">
						{tweets.map((id) => (
							<TweetCard key={id} id={id} />
						))}
					</Reveal>
				</Section>
			)}

			<Section divider="line" index={nextIndex()} title="Stack">
				<Reveal className="flex flex-wrap gap-1.5">
					{project.technologies.map((tech) => (
						<TechPill key={tech} name={tech} />
					))}
				</Reveal>
			</Section>

			{prev && next && (
				<Section
					divider="line"
					className="flex items-center justify-between gap-4 px-5 py-8 text-sm sm:px-8"
				>
					<KeepFromLink
						href={`/projects/${projectSlug(prev)}`}
						className="group inline-flex items-center gap-2 text-muted transition-colors duration-300 hover:text-foreground"
					>
						<RiArrowLeftLine
							size={14}
							className="group-hover:-translate-x-0.5 text-faint transition-transform duration-300 ease-soft"
						/>
						{prev.title}
					</KeepFromLink>
					<KeepFromLink
						href={`/projects/${projectSlug(next)}`}
						className="group inline-flex items-center gap-2 text-muted transition-colors duration-300 hover:text-foreground"
					>
						{next.title}
						<RiArrowRightLine
							size={14}
							className="text-faint transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
						/>
					</KeepFromLink>
				</Section>
			)}

			<Footer />
		</Frame>
	);
}
