import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Children, createElement, isValidElement } from "react";
import { codeToHtml } from "shiki";

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  let headers = data.headers.map((header, index) => (
    <th key={index} className="p-2 text-left">
      {header}
    </th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex} className="p-2 text-left">
          {cell}
        </td>
      ))}
    </tr>
  ));

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink({
  href,
  ...props
}: React.ComponentProps<typeof Link> & { href: string }) {
  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        {...props}
        className="text-green-300 hover:text-green-400 underline"
      >
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      className="text-green-300 hover:text-green-400 underline"
    />
  );
}

function CustomImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      alt={props.alt}
      className="my-8 rounded-lg"
      {...props}
      width={800}
      height={400}
    />
  );
}

async function Pre({
  children,
  ...props
}: React.HtmlHTMLAttributes<HTMLPreElement>) {
  const codeElement = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === "code"
  ) as React.ReactElement<HTMLPreElement> | undefined;

  const className = codeElement?.props?.className ?? "";
  const isCodeBlock =
    typeof className === "string" && className.startsWith("language-");

  if (isCodeBlock) {
    const lang = className.split(" ")[0]?.split("-")[1] ?? "";

    if (!lang) {
      return <code {...props}>{children}</code>;
    }

    const html = await codeToHtml(String(codeElement?.props.children), {
      lang,
      themes: {
        dark: "vesper",
        light: "vesper",
      },
    });

    return (
      <div
        className="border border-zinc-800 p-4 my-6 overflow-x-auto code-block-container"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <pre {...props} className="m-16">
      {children}
    </pre>
  );
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(level: number) {
  const classNames: Record<number, string> = {
    1: "text-3xl font-semibold text-gray-300 my-5 mt-16",
    2: "text-2xl font-semibold text-gray-300 my-5 mt-16",
    3: "text-xl font-semibold text-gray-300 my-5 mt-16",
    4: "text-lg font-semibold text-gray-300 my-5 mt-16",
    5: "text-md font-semibold text-gray-300 my-5 mt-16",
    6: "text-base font-semibold text-gray-300 my-5 mt-16",
  };

  const HeadingComponent = ({ children }: { children: React.ReactNode }) => {
    const childrenString = Children.toArray(children).join("");
    const slug = slugify(childrenString);

    return createElement(
      `h${level}`,
      { id: slug, className: classNames[level] },
      [
        createElement(
          "a",
          {
            href: `#${slug}`,
            key: `link-${slug}`,
            className: "anchor",
          },
          children
        ),
      ]
    );
  };

  HeadingComponent.displayName = `Heading${level}`;
  return HeadingComponent;
}

const components = {
  a: CustomLink,
  img: CustomImage,
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  div: ({ children }: { children: React.ReactNode }) => (
    <div className="border border-gray-500 p-4 rounded-lg">{children}</div>
  ),
  pre: Pre,
  Table,
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc pl-5 space-y-2 text-gray-400">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-[upper-letter] pl-5 space-y-2 text-gray-400">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-gray-400">{children}</li>
  ),
};

export function MDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components ?? {}) }}
    />
  );
}
