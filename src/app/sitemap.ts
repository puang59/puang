import type { MetadataRoute } from "next";
import { projectList, projectSlug } from "~/components/Projects";
import { getPostsMetadata } from "~/components/utils/blog";
import { site } from "~/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();
	const posts = getPostsMetadata();

	return [
		{
			url: site.url,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${site.url}/projects`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		...projectList.map((project) => ({
			url: `${site.url}/projects/${projectSlug(project)}`,
			lastModified: now,
			changeFrequency: "monthly" as const,
			priority: 0.8,
		})),
		{
			url: `${site.url}/blog`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		...posts.map((post) => ({
			url: `${site.url}/blog/${post.slug}`,
			lastModified: new Date(post.metadata.date),
			changeFrequency: "yearly" as const,
			priority: 0.6,
		})),
	];
}
