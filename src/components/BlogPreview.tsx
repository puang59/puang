import Link from "next/link";
import { getPostsMetadata } from "./utils/blog";

export default function BlogPreview() {
  const allBlogs = getPostsMetadata();
  
  // Sort by date (descending) and take top 4
  const blogs = allBlogs
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
    .slice(0, 4);

  return (
    <div className="text-white mb-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">
          <span className="text-green-300">&gt;</span> blogs
        </h1>
        <Link 
          href="/blog" 
          className="text-sm text-gray-500 hover:text-green-300 transition-all duration-300 flex items-center gap-1"
        >
          view all <span className="text-xs">→</span>
        </Link>
      </div>
      
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div key={blog.slug} className="group">
            <Link
              href={`/blog/${blog.slug}`}
              className="flex items-baseline justify-between gap-4"
            >
              <h2 className="text-md text-gray-200 group-hover:text-green-300 transition-colors duration-300 truncate">
                {blog.metadata.title}
              </h2>
              <p className="text-gray-500 text-xs font-mono whitespace-nowrap">
                {new Date(blog.metadata.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
