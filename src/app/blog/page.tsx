import fs from "fs";
import path from "path";
import matter from "gray-matter";

type BlogPost = {
  slug: string;
  title: string;
  date: string;
};

export default function Blogs() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);

  const blogs: BlogPost[] = filenames
    .filter((filename) => {
      const filePath = path.join(postsDirectory, filename);
      return fs.statSync(filePath).isFile();
    })
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug: filename.replace(/\.mdx?$/, ""),
        title: data.title,
        date: data.date,
      };
    });

  blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="flex min-h-screen flex-col text-white p-8 md:p-16 lg:p-24 max-w-4xl mx-auto mt-5 md:mt-0">
      <div className="flex-1">
        <h1 className="text-3xl text-white font-bold mb-10">
          <span className="text-green-300">&gt;</span> blogs
        </h1>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.slug} className="pb-4 group">
              <a
                href={`/blog/${blog.slug}`}
                className="group-hover:text-green-300 transition-all duration-300"
              >
                <span className="text-xl font-semibold">{blog.title}</span>

                <p className="text-gray-500 mt-1 text-xs">
                  {new Date(blog.date).toLocaleDateString("en-US", {
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
