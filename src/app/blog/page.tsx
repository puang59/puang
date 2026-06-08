import { getPostsMetadata } from "~/components/utils/blog";

export default function Blogs() {
	const blogs = getPostsMetadata();

	blogs.sort(
		(a, b) =>
			new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
	);

	return (
		<main className="mx-auto mt-5 flex min-h-screen max-w-5xl flex-col p-8 text-white md:mt-0 md:p-16 lg:p-24">
			<div className="flex-1">
				<h1 className="mb-6 font-bold text-3xl text-white">
					<span className="text-green-300">&gt;</span> blogs
				</h1>
				<p className="mb-10 max-w-2xl text-gray-400 text-sm leading-relaxed">
If you're interested in my personal thoughts, experiences, and reflections, you'll find more of them at {" "}
					<a
						href="https://weblog.puang.in"
						target="_blank"
						rel="noopener noreferrer"
						className="text-green-300 transition-all duration-300 hover:underline"
					>
						weblog.puang.in
					</a>
				</p>
				<ul>
					{blogs.map((blog) => (
						<li key={blog.slug} className="group pb-4">
							<a
								href={`/blog/${blog.slug}`}
								className="transition-all duration-300 group-hover:text-green-300"
							>
								<span className="font-semibold text-xl">
									{blog.metadata.title}
								</span>

								<p className="mt-1 text-gray-500 text-xs">
									{new Date(blog.metadata.date).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</p>
							</a>
						</li>
					))}
				</ul>
			</div>
		</main>
		// <div className="font-mono min-h-screen flex flex-col md:flex-row md:items-start md:justify-between gap-4">
	);
}

export const metadata = {
	title: "Blogs",
	description: "Some of my writings about stuffs",
	openGraph: {
		images: [
			{
				url: "https://www.puang.in/og/home?title=blogs",
			},
		],
	},
};
