import type { Metadata } from "next";
import Link from "next/link";
import Footer from "~/components/Footer";
import PageHeader from "~/components/PageHeader";
import Reveal from "~/components/Reveal";
import Rise from "~/components/Rise";
import { Frame, Section } from "~/components/frame";
import { getPostsMetadata } from "~/components/utils/blog";
import { ogImage } from "~/lib/site";

export default function Blogs() {
	const blogs = getPostsMetadata().sort(
		(a, b) =>
			new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
	);

	return (
		<Frame>
			<PageHeader back="/" backLabel="home" trail={`${blogs.length} posts`} />
			<Section className="px-5 pt-10 pb-8 sm:px-8">
				<Rise delay={0.06}>
					<h1 className="font-semibold text-[28px] text-foreground tracking-tight">
						Writing
					</h1>
					<p className="mt-3 text-[15px] text-muted leading-relaxed">
						Notes on things I've built and taken apart. For more personal
						thoughts and reflections, head over to{" "}
						<a
							href="https://weblog.puang.in"
							target="_blank"
							rel="noopener noreferrer"
							className="text-foreground underline decoration-edge underline-offset-4 transition-colors duration-300 hover:decoration-foreground"
						>
							weblog.puang.in
						</a>
						.
					</p>
				</Rise>
			</Section>

			<Section divider="line" className="px-5 py-8 sm:px-8">
				<div className="-mx-3">
					{blogs.map((blog, i) => (
						<Reveal key={blog.slug} delay={i * 0.04}>
							<Link
								href={`/blog/${blog.slug}`}
								className="group flex items-baseline gap-3 rounded-md px-3 py-2.5 transition-colors duration-300 ease-soft hover:bg-surface"
							>
								<span className="w-24 shrink-0 font-mono text-[11px] text-faint tabular-nums">
									{new Date(blog.metadata.date).toLocaleDateString("en-US", {
										year: "numeric",
										month: "short",
									})}
								</span>
								<span className="text-muted text-sm transition-colors duration-300 group-hover:text-foreground">
									{blog.metadata.title}
								</span>
							</Link>
						</Reveal>
					))}
				</div>
			</Section>

			<Footer />
		</Frame>
	);
}

const description =
	"Writing by Karan Kumar on things he has built and taken apart: systems, tools and the web.";

export const metadata: Metadata = {
	title: "Writing",
	description,
	alternates: { canonical: "/blog" },
	openGraph: {
		title: "Writing · Karan Kumar",
		description,
		url: "/blog",
		images: [
			{
				url: ogImage({ title: "Writing", subtitle: description }),
				width: 1200,
				height: 630,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Writing · Karan Kumar",
		description,
		images: [ogImage({ title: "Writing", subtitle: description })],
	},
};
