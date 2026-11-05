import type { Metadata } from "next";
import Footer from "~/components/Footer";
import PageHeader from "~/components/PageHeader";
import { ProjectCards } from "~/components/ProjectCards";
import { projectList } from "~/components/Projects";
import Rise from "~/components/Rise";
import { Frame, Section } from "~/components/frame";
import { ogImage } from "~/lib/site";

export default function Projects() {
	return (
		<Frame>
			<PageHeader
				back="/"
				backLabel="home"
				trail={`${projectList.length} projects`}
			/>
			<Section className="px-5 pt-10 pb-6 sm:px-8">
				<Rise delay={0.06}>
					<h1 className="font-semibold text-[28px] text-foreground tracking-tight">
						Projects
					</h1>
					<p className="mt-3 text-[15px] text-muted leading-relaxed">
						Things I've built and shipped. Open one for demos, write-ups and the
						stack behind it.
					</p>
				</Rise>
			</Section>
			<Section divider="line">
				<ProjectCards projects={projectList} />
			</Section>
			<Footer />
		</Frame>
	);
}

const description =
	"Projects by Karan Kumar: devdoq, nuza, molly and more. Web apps, desktop apps, CLI tools and AI agents, with demos and the stack behind each one.";

export const metadata: Metadata = {
	title: "Projects",
	description,
	alternates: { canonical: "/projects" },
	openGraph: {
		title: "Projects · Karan Kumar",
		description,
		url: "/projects",
		images: [
			{
				url: ogImage({
					title: "Projects",
					subtitle: "Things I've built and shipped.",
				}),
				width: 1200,
				height: 630,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Projects · Karan Kumar",
		description,
		images: [
			ogImage({
				title: "Projects",
				subtitle: "Things I've built and shipped.",
			}),
		],
	},
};
