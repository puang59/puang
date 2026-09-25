export type MediaItem =
	| { type: "image"; src: string; alt: string }
	| { type: "youtube"; id: string }
	| { type: "tweet"; id: string };

export type ProjectLink = {
	label: string;
	url: string;
	type: "live" | "demo" | "github" | "npm" | "pypi" | "blog";
};

export type Project = {
	title: string;
	description: string;
	technologies: string[];
	stats?: string[];
	media: MediaItem[];
	links: ProjectLink[];
};

export const projectList: Project[] = [
	{
		title: "devdoq",
		description:
			"An AI-powered developer documentation platform that automatically analyzes entire codebases to generate docs, API references, and a visual codebase mindmap. Uses CocoIndex for vector indexing and intelligent code chunking, with BullMQ-backed background workers handling multi-threaded generation for large repositories — plus a chat interface for talking directly to your code.",
		technologies: [
			"Next.js",
			"Convex",
			"AI SDK",
			"Redis",
			"CocoIndex",
			"Zustand",
		],
		stats: ["700+ users", "10K+ docs generated", "650+ beta testers"],
		media: [
			{ type: "image", src: "/devdoq/cover.png", alt: "devdoq preview" },
			{ type: "tweet", id: "1937491944982339706" },
		],
		links: [{ label: "Live", url: "https://devdoq.com", type: "live" }],
	},
	{
		title: "nuza",
		description:
			"A lightning-fast, privacy-first, open-source alternative to Obsidian — a native Tauri + React desktop app with a strictly local file-system approach. Ships with native Vim keybindings, a CodeMirror 6 editor core, and a minimalist UI designed to stay out of your way, with zero cloud dependency.",
		technologies: [
			"Tauri",
			"React",
			"TypeScript",
			"CodeMirror",
			"Vite",
			"Tailwind CSS",
		],
		media: [
			{ type: "image", src: "/nuza/cover.png", alt: "nuza preview" },
			{ type: "tweet", id: "2103406694214570071" },
		],
		links: [
			{ label: "Live", url: "https://nuza.puang.in", type: "live" },
			{
				label: "GitHub",
				url: "https://github.com/puang59/nuza",
				type: "github",
			},
		],
	},
	{
		title: "tars",
		description:
			"An AI clipboard companion that lives behind a global hotkey — invoke it anywhere and it reads your clipboard or on-screen context to answer questions instantly through an LLM without breaking your flow. Built as a Tauri desktop app with a React frontend and Supabase for history sync.",
		technologies: ["Tauri", "React", "TypeScript", "Groq", "Supabase", "Vite"],
		media: [
			{ type: "image", src: "/tars/cover1.png", alt: "tars preview 1" },
			{ type: "image", src: "/tars/cover2.png", alt: "tars preview 2" },
			{ type: "image", src: "/tars/cover3.png", alt: "tars preview 3" },
			{ type: "image", src: "/tars/cover4.png", alt: "tars preview 4" },
			{ type: "image", src: "/tars/cover5.png", alt: "tars preview 5" },
			{ type: "tweet", id: "1985596503923310840" },
		],
		links: [
			{
				label: "GitHub",
				url: "https://github.com/puang59/tars",
				type: "github",
			},
		],
	},
	{
		title: "molly",
		description:
			"A terminal-native, realtime Discord chat client built with Charm's Bubble Tea TUI framework — full messaging, channel switching, DMs, and notifications, all rendered as a fast, keyboard-driven terminal UI backed by a WebSocket connection and a local SQLite cache.",
		technologies: ["Go", "Bubble Tea", "WebSocket", "SQLite"],
		stats: ["40+ GitHub stars"],
		media: [
			{ type: "image", src: "/molly/molly.png", alt: "molly preview" },
			{ type: "tweet", id: "2058457977133346876" },
		],
		links: [
			{
				label: "GitHub",
				url: "https://github.com/ploglabs/molly-terminal",
				type: "github",
			},
		],
	},
	{
		title: "zeno",
		description:
			"A terminal-native coding agent that runs entirely on your machine — it reads your local codebase, git history, and files to investigate issues and ship changes right from the CLI, calling out to an LLM via the OpenAI SDK only when it needs reasoning, while file and git operations stay local.",
		technologies: ["TypeScript", "Bun", "OpenAI SDK", "Zod"],
		media: [
			{ type: "image", src: "/zeno/cover.jpeg", alt: "zeno preview" },
			{ type: "tweet", id: "2091476372216824056" },
		],
		links: [
			{
				label: "GitHub",
				url: "https://github.com/puang59/zeno",
				type: "github",
			},
		],
	},
	{
		title: "xtoxic",
		description:
			"A real-time Twitter toxicity analyzer built and shipped in under an hour — paste a handle and Exa pulls their recent tweets, which Gemini scores for toxicity through the Vercel AI SDK, streaming back an instant breakdown.",
		technologies: ["Next.js", "Exa", "Gemini", "Vercel AI SDK"],
		stats: ["12,000+ users", "50K+ impressions / 12hr", "30+ GitHub stars"],
		media: [
			{ type: "image", src: "/xtoxic/cover.png", alt: "xtoxic preview" },
			{ type: "tweet", id: "1903397349017161909" },
		],
		links: [
			{
				label: "GitHub",
				url: "https://github.com/puang59/xtoxic",
				type: "github",
			},
		],
	},
	{
		title: "http-server",
		description:
			"A multi-threaded HTTP server written entirely from scratch in C — raw POSIX sockets, a thread-per-connection model, a hand-rolled request parser with regex-based routing, MIME type detection, and URL decoding, tuned to serve static files at high throughput with a small memory footprint.",
		technologies: ["C", "Linux", "Sockets", "POSIX Threads", "Regex"],
		stats: ["9,000+ RPS", "99.99% uptime", "2.8ms latency"],
		media: [
			{
				type: "image",
				src: "/http-server/cover.png",
				alt: "http-server preview",
			},
		],
		links: [
			{
				label: "GitHub",
				url: "https://github.com/puang59/http-server",
				type: "github",
			},
			{
				label: "Blog",
				url: "https://www.puang.in/blog/http-server",
				type: "blog",
			},
		],
	},
	{
		title: "lexit",
		description:
			"A personal vocabulary builder that generates AI-powered definitions and usage examples with Gemini, then saves each word to a real-time Convex database so it's instantly searchable across devices. Includes Clerk auth and Upstash-backed rate limiting on the AI endpoints.",
		technologies: ["Next.js", "Convex", "Gemini AI", "Clerk", "Zustand"],
		media: [
			{ type: "image", src: "/lexit/cover.png", alt: "lexit preview" },
			{ type: "tweet", id: "1980993413291081781" },
		],
		links: [
			{ label: "Live", url: "https://lexit.puang.in", type: "live" },
			{
				label: "GitHub",
				url: "https://github.com/puang59/lexit",
				type: "github",
			},
		],
	},
	{
		title: "internode",
		description:
			"A self-hosted search engine — a Go backend built on Gin and Colly that recursively crawls and indexes the web, exposing search and quick-search endpoints, paired with a Next.js frontend for querying the index in real time.",
		technologies: ["Go", "Gin", "Colly", "Next.js", "TypeScript"],
		media: [
			{ type: "image", src: "/internode/cover.jpeg", alt: "internode preview" },
			{ type: "tweet", id: "1931346350261641349" },
		],
		links: [
			{
				label: "GitHub",
				url: "https://github.com/puang59/internode2",
				type: "github",
			},
		],
	},
	{
		title: "wallgrab",
		description:
			"An interactive CLI to search and download high-resolution wallpapers from Wallhaven — run it with no arguments for a guided terminal wizard built on Clack, or pass flags via Commander for scripting. Skips wallpapers you've already downloaded and auto-opens the destination folder when done.",
		technologies: ["TypeScript", "Bun", "Commander", "Clack"],
		stats: ["128+ downloads"],
		media: [
			{ type: "image", src: "/wallgrab/cover.png", alt: "wallgrab preview" },
			{ type: "tweet", id: "2062120049025180154" },
		],
		links: [
			{
				label: "npm",
				url: "https://www.npmjs.com/package/wallgrab",
				type: "npm",
			},
			{
				label: "GitHub",
				url: "https://github.com/puang59/wallgrab-pkg",
				type: "github",
			},
		],
	},
	{
		title: "smacknet",
		description:
			"A browser-based network-attack tool for launching and monitoring HTTP/TCP load tests — configure attack methods, proxy pools, and user agents from a Next.js dashboard, with Web Workers running the traffic generation and Socket.IO streaming live stats back to the UI.",
		technologies: ["Next.js", "TypeScript", "Socket.IO", "Web Workers"],
		media: [
			{ type: "youtube", id: "S5Fwc5TDXHo" },
			{ type: "tweet", id: "1935698293880951087" },
		],
		links: [
			{ label: "Demo", url: "https://youtu.be/S5Fwc5TDXHo", type: "demo" },
			{
				label: "GitHub",
				url: "https://github.com/puang59/smacknet",
				type: "github",
			},
		],
	},
	{
		title: "FileEase",
		description:
			"A CLI tool that keeps your filesystem tidy — sorts files into folders by keyword or extension, with built-in Fernet-based file encryption/decryption and zip compress/extract utilities, all wrapped in a Click-powered interactive interface.",
		technologies: ["Python", "Click", "Cryptography"],
		media: [
			{ type: "image", src: "/FileEase/cover.png", alt: "FileEase preview" },
			{ type: "youtube", id: "AwcSrI3sijQ" },
		],
		links: [
			{ label: "Demo", url: "https://youtu.be/AwcSrI3sijQ", type: "demo" },
			{
				label: "GitHub",
				url: "https://github.com/puang59/FileEase",
				type: "github",
			},
		],
	},
	{
		title: "RoboArt",
		description:
			"A tiny Python package, powered by Robohash.org, that turns any hash string into a deterministic, reproducible avatar — generate robots, monsters, robot heads, or kittens from the same input every time, handy for auto-generating user avatars.",
		technologies: ["Python", "PyPI"],
		media: [],
		links: [
			{ label: "PyPI", url: "https://pypi.org/project/RoboArt/", type: "pypi" },
			{
				label: "GitHub",
				url: "https://github.com/puang59/roboart",
				type: "github",
			},
		],
	},
];
