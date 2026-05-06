import fs from "fs";
import path from "path";

export type Metadata = {
  title: string;
  description: string;
  date: string;
};

export type FrontmatterParseResult = {
  metadata: Metadata;
  content: string;
};

export type MDXFileData = FrontmatterParseResult & {
  slug: string;
};

const postsCache = new Map<string, MDXFileData>();

export function getPosts(): MDXFileData[] {
  return getMDXData(path.join(process.cwd(), "posts"));
}

export function getPostsMetadata(): Omit<MDXFileData, "content">[] {
  const dir = path.join(process.cwd(), "posts");
  const mdxFiles = getMDXFiles(dir);

  return mdxFiles.map((file) => {
    const filePath = path.join(dir, file);
    const rawContent = fs.readFileSync(filePath, "utf-8");
    const { metadata } = parseFrontmatter(rawContent);
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
    };
  });
}

export function getPostBySlug(slug: string): MDXFileData | null {
  // Check cache first
  if (postsCache.has(slug)) {
    return postsCache.get(slug) || null;
  }

  const filePath = path.join(process.cwd(), "posts", `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const { metadata, content } = readMDXFile(filePath);
    const post = {
      metadata,
      slug,
      content,
    };
    postsCache.set(slug, post);
    return post;
  } catch (e) {
    console.error(`Error reading post ${slug}:`, e);
    return null;
  }
}

function parseFrontmatter(fileContent: string): FrontmatterParseResult {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    throw new Error("No frontmatter found");
  }

  const frontmatter = match[1];

  if (!frontmatter) {
    throw new Error("No frontmatter found");
  }

  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontmatterLines = frontmatter.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  frontmatterLines.forEach((line) => {
    const [key, ...values] = line.split(": ");
    let value = values.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1");
    if (key && value) {
      metadata[key.trim() as keyof Metadata] = value;
    }
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".md");
}

function readMDXFile(filePath: string): FrontmatterParseResult {
  const rawContent = fs.readFileSync(filePath, "utf-8");

  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string): MDXFileData[] {
  const mdxFiles = getMDXFiles(dir);

  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}
