import { RiArrowRightUpLine } from "@remixicon/react";
import Link from "next/link";
import Reveal from "./Reveal";
import { Section } from "./frame";
import TransitionLink from "./utils/TransitionLink";
import { getPostsMetadata } from "./utils/blog";

export default function BlogPreview() {
	const blogs = getPostsMetadata()
		.sort(
			(a, b) =>
				new Date(b.metadata.date).getTime() -
				new Date(a.metadata.date).getTime(),
		)
		.slice(0, 4);

	return (
		<Section
			id="writing"
			index="05"
			title="Writing"
			action={
				<TransitionLink
					href="/blog"
					className="group btn btn-secondary btn-sm mr-1"
				>
					View all
					<RiArrowRightUpLine
						size={13}
						className="group-hover:-translate-y-px transition-transform duration-300 ease-soft group-hover:translate-x-px"
					/>
				</TransitionLink>
			}
		>
			<div className="-mx-3">
				{blogs.map((blog, i) => (
					<Reveal key={blog.slug} delay={i * 0.05}>
						<Link
							href={`/blog/${blog.slug}?from=home`}
							className="group flex items-baseline gap-3 rounded-md px-3 py-2 transition-colors duration-300 ease-soft hover:bg-surface"
						>
							<span className="hidden w-24 shrink-0 font-mono text-[11px] text-faint tabular-nums sm:block">
								{new Date(blog.metadata.date).toLocaleDateString("en-US", {
									year: "numeric",
									month: "short",
								})}
							</span>
							<h3 className="truncate text-muted text-sm transition-colors duration-300 group-hover:text-foreground">
								{blog.metadata.title}
							</h3>
						</Link>
					</Reveal>
				))}
			</div>
		</Section>
	);
}
