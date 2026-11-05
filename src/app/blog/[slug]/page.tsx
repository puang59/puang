import { notFound } from "next/navigation";
import Footer from "~/components/Footer";
import PageHeader from "~/components/PageHeader";
import { OriginBackLink } from "~/components/ProjectNav";
import Reveal from "~/components/Reveal";
import Rise from "~/components/Rise";
import { Frame, Section } from "~/components/frame";
import { getPostBySlug, getPosts } from "~/components/utils/blog";
import { site } from "~/lib/site";
import { MDX } from "./mdx";

export async function generateStaticParams() {
	const posts = getPosts();
	return posts.map((post) => ({
		slug: post.slug,
	}));
}

type SlugParams = { slug: string };

export async function generateMetadata({
	params,
}: {
	params: Promise<SlugParams>;
}) {
	const { slug } = await params;
	const post = getPostBySlug(slug);
	if (!post) {
		return;
	}

	const publishedTime = formatDate(post.metadata.date);

	const image = `/og/blog?${new URLSearchParams({
		title: post.metadata.title,
		top: publishedTime,
	})}`;

	return {
		title: post.metadata.title,
		description: post.metadata.description,
		alternates: { canonical: `/blog/${post.slug}` },
		openGraph: {
			title: post.metadata.title,
			description: post.metadata.description,
			publishedTime: new Date(post.metadata.date).toISOString(),
			authors: [site.name],
			type: "article",
			url: `/blog/${post.slug}`,
			images: [{ url: image, width: 1200, height: 630 }],
		},
		twitter: {
			title: post.metadata.title,
			description: post.metadata.description,
			card: "summary_large_image",
			creator: site.twitter,
			images: [image],
		},
	};
}

export default async function Post({
	params,
}: {
	params: Promise<SlugParams>;
}) {
	const { slug } = await params;
	const post = getPostBySlug(slug);
	if (!post) {
		notFound();
	}

	return (
		<Frame>
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BlogPosting",
						headline: post.metadata.title,
						datePublished: post.metadata.date,
						dateModified: post.metadata.date,
						description: post.metadata.description,
						image: `https://www.puang.in/og/blog?title=${
							post.metadata.title
						}&top=${formatDate(post.metadata.date)}`,
						url: `https://www.puang.in/blog/${post.slug}`,
						author: {
							"@type": "Person",
							name: "Karan Kumar",
						},
					}),
				}}
			/>
			<PageHeader
				backLink={
					<OriginBackLink href="/blog" label="writing" homeHref="/#writing" />
				}
				trail={formatDate(post.metadata.date).toLowerCase()}
			/>
			<Section className="px-5 pt-10 pb-8 sm:px-8">
				<Rise delay={0.06}>
					<h1 className="font-semibold text-[28px] text-foreground leading-tight tracking-tight">
						{post.metadata.title}
					</h1>
					{post.metadata.description && (
						<p className="mt-3 text-[15px] text-muted leading-relaxed">
							{post.metadata.description}
						</p>
					)}
				</Rise>
			</Section>
			<Section divider="line" className="px-5 py-10 sm:px-8">
				<Reveal delay={0.1}>
					<article className="text-[15px] text-muted leading-8">
						<MDX source={post.content} />
					</article>
				</Reveal>
			</Section>
			<Footer />
		</Frame>
	);
}

function formatDate(date: string) {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
