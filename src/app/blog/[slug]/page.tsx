import { notFound } from "next/navigation";
import { MDX } from "./mdx";
import { getPostBySlug } from "~/components/utils/blog";
import BackButton from "~/components/BackButton";

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

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      publishedTime,
      type: "article",
      url: `https://www.puang.in/blog/${post.slug}`,
      images: [
        {
          url: `https://www.puang.in/og/blog?title=${post.metadata.title}`,
        },
      ],
    },
    twitter: {
      title: post.metadata.title,
      description: post.metadata.description,
      card: "summary_large_image",
      creator: "@puangg59",
      images: [
        `https://www.puang.in/og/blog?title=${post.metadata.title}&top=${publishedTime}`,
      ],
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
    <section className="animate-fade-in-up max-w-4xl mx-auto px-6 font-mono text-md mt-5 p-8">
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
      <BackButton />
      <h1 className="text-4xl font-bold mb-4 mt-2 text-white">
        {post.metadata.title}
      </h1>
      <div className="mb-8 flex items-center justify-between text-sm text-gray-400">
        <time className="text-gray-500 mt-2 block">
          {formatDate(post.metadata.date)}
        </time>
      </div>
      <article className="prose prose-lg dark:prose-invert max-w-none text-gray-400 my-6 leading-10">
        <MDX source={post.content} />
      </article>
    </section>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
