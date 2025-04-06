import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

export interface Frontmatter {
  title: string;
  description: string;
  date: string;
  image?: string;
}

export async function getMdxContent(slug: string) {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`No post found for slug: ${slug}`);
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContent);

  // Use compileMDX from next-mdx-remote/rsc
  const { content: compiledContent } = await compileMDX({
    source: content,
    options: { parseFrontmatter: false },
  });

  return {
    content: compiledContent,
    frontmatter: data as Frontmatter,
  };
}
