import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { Children, createElement, isValidElement } from "react";
import { codeToHtml } from "shiki";

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
	const headers = data.headers.map((header, index) => (
		<th key={index} className="p-2 text-left">
			{header}
		</th>
	));
	const rows = data.rows.map((row, index) => (
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
				className="text-foreground underline decoration-edge underline-offset-4 transition-colors duration-300 hover:decoration-foreground"
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
			className="text-foreground underline decoration-edge underline-offset-4 transition-colors duration-300 hover:decoration-foreground"
		/>
	);
}

// Hosts next/image is allowed to optimize (see images.remotePatterns).
const OPTIMIZED_HOSTS = new Set([
	"i.imgur.com",
	"pbs.twimg.com",
	"img.youtube.com",
]);

const canOptimize = (src: string) => {
	if (src.startsWith("/")) return true;
	try {
		return OPTIMIZED_HOSTS.has(new URL(src).hostname);
	} catch {
		return false;
	}
};

function CustomImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
	const src = typeof props.src === "string" ? props.src : "";
	const className = "my-8 h-auto max-w-full rounded-lg ring-1 ring-line";

	// Images from any other host render as a plain lazy <img> instead of crashing.
	if (!canOptimize(src)) {
		return (
			<img
				src={src}
				alt={props.alt || ""}
				loading="lazy"
				decoding="async"
				className={className}
			/>
		);
	}

	return (
		<Image
			alt={props.alt || ""}
			className={className}
			src={src}
			width={1200}
			height={675}
			sizes="(min-width: 760px) 696px, 100vw"
			style={{ height: "auto" }}
		/>
	);
}

async function Pre({
	children,
	...props
}: React.HtmlHTMLAttributes<HTMLPreElement>) {
	const codeElement = Children.toArray(children).find(
		(child) => isValidElement(child) && child.type === "code",
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
				className="code-block-container my-6 overflow-x-auto rounded-lg border border-line bg-surface p-4 text-[13px] leading-6"
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
		1: "text-2xl font-semibold text-foreground tracking-tight mt-14 mb-4",
		2: "text-xl font-semibold text-foreground tracking-tight mt-14 mb-4",
		3: "text-lg font-semibold text-foreground tracking-tight mt-12 mb-3",
		4: "text-base font-semibold text-foreground mt-10 mb-3",
		5: "text-base font-medium text-foreground mt-10 mb-3",
		6: "text-sm font-medium text-foreground mt-10 mb-3",
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
					children,
				),
			],
		);
	};

	HeadingComponent.displayName = `Heading${level}`;
	return HeadingComponent;
}

const components = {
	hr: () => (
		<hr className="my-10 border-0 border-line border-t border-dashed" />
	),
	a: CustomLink,
	img: CustomImage,
	h1: createHeading(1),
	h2: createHeading(2),
	h3: createHeading(3),
	h4: createHeading(4),
	h5: createHeading(5),
	h6: createHeading(6),
	div: ({ children }: { children: React.ReactNode }) => (
		<div className="rounded-lg border border-line bg-surface p-4">
			{children}
		</div>
	),
	pre: Pre,
	Table,
	ul: ({ children }: { children: React.ReactNode }) => (
		<ul className="list-disc space-y-2 pl-5 text-muted">{children}</ul>
	),
	ol: ({ children }: { children: React.ReactNode }) => (
		<ol className="list-[upper-letter] space-y-2 pl-5 text-muted">
			{children}
		</ol>
	),
	li: ({ children }: { children: React.ReactNode }) => (
		<li className="text-muted">{children}</li>
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
