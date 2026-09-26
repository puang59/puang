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
	description: string[];
	technologies: string[];
	languages: string[];
	stats?: string[];
	media: MediaItem[];
	links: ProjectLink[];
};

export const projectList: Project[] = [
	{
		title: "devdoq",
		description: [
			"AI-powered platform that analyzes entire codebases to auto-generate docs, API references, and a visual codebase mindmap.",
			"Uses CocoIndex for vector indexing and intelligent code chunking.",
			"BullMQ-backed background workers handle multi-threaded doc generation for large repos.",
			"Chat interface for talking directly to your code.",
		],
		technologies: [
			"Next.js",
			"Convex",
			"AI SDK",
			"Redis",
			"CocoIndex",
			"Zustand",
		],
		languages: ["TypeScript", "Python", "Go", "Astro"],
		stats: ["700+ users", "10K+ docs generated", "650+ beta testers"],
		media: [
			{ type: "image", src: "/devdoq/cover.png", alt: "devdoq preview" },
			{ type: "tweet", id: "1937491944982339706" },
		],
		links: [{ label: "Live", url: "https://devdoq.com", type: "live" }],
	},
	{
		title: "nuza",
		description: [
			"Lightning-fast, privacy-first open-source alternative to Obsidian.",
			"Native Tauri + React desktop app with a strictly local file-system approach.",
			"Ships with native Vim keybindings and a CodeMirror 6 editor core.",
			"Minimalist UI with zero cloud dependency.",
		],
		technologies: [
			"Tauri",
			"React",
			"TypeScript",
			"CodeMirror",
			"Vite",
			"Tailwind CSS",
		],
		languages: ["TypeScript", "Rust"],
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
		description: [
			"AI clipboard companion invoked anywhere via a global hotkey.",
			"Reads your clipboard or on-screen context to answer questions instantly through an LLM.",
			"Built as a Tauri desktop app with a React frontend.",
			"Supabase-backed history sync.",
		],
		technologies: ["Tauri", "React", "TypeScript", "Groq", "Supabase", "Vite"],
		languages: ["TypeScript", "Rust"],
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
		description: [
			"Terminal-native, realtime Discord chat client built with Charm's Bubble Tea.",
			"Full messaging, channel switching, DMs, and notifications.",
			"Fast, keyboard-driven TUI.",
			"WebSocket connection backed by a local SQLite cache.",
		],
		technologies: ["Go", "Bubble Tea", "WebSocket", "SQLite"],
		languages: ["Go", "TypeScript"],
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
		description: [
			"Terminal-native coding agent that runs entirely on your machine.",
			"Reads your local codebase, git history, and files to investigate issues and ship changes from the CLI.",
			"Calls an LLM via the OpenAI SDK only when reasoning is needed.",
			"File and git operations stay fully local.",
		],
		technologies: ["TypeScript", "Bun", "OpenAI SDK", "Zod"],
		languages: ["TypeScript"],
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
		description: [
			"Real-time Twitter toxicity analyzer built and shipped in under an hour.",
			"Exa pulls a handle's recent tweets.",
			"Gemini scores them for toxicity via the Vercel AI SDK.",
			"Streams back an instant breakdown.",
		],
		technologies: ["Next.js", "Exa", "Gemini", "Vercel AI SDK"],
		languages: ["TypeScript"],
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
		description: [
			"Multi-threaded HTTP server written entirely from scratch in C.",
			"Raw POSIX sockets with a thread-per-connection model.",
			"Hand-rolled request parser with regex-based routing, MIME detection, and URL decoding.",
			"Tuned for high throughput with a small memory footprint.",
		],
		technologies: ["C", "Linux", "Sockets", "POSIX Threads", "Regex"],
		languages: ["C"],
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
		description: [
			"Personal vocabulary builder with AI-generated definitions and usage examples via Gemini.",
			"Saves each word to a real-time Convex database, instantly searchable across devices.",
			"Clerk authentication.",
			"Upstash-backed rate limiting on the AI endpoints.",
		],
		technologies: ["Next.js", "Convex", "Gemini AI", "Clerk", "Zustand"],
		languages: ["TypeScript"],
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
		description: [
			"Self-hosted search engine.",
			"Go backend (Gin + Colly) that recursively crawls and indexes the web.",
			"Exposes search and quick-search endpoints.",
			"Next.js frontend for real-time querying.",
		],
		technologies: ["Go", "Gin", "Colly", "Next.js", "TypeScript"],
		languages: ["Go", "TypeScript"],
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
		description: [
			"Interactive CLI to search and download high-res wallpapers from Wallhaven.",
			"Guided terminal wizard (Clack) or scriptable flag mode (Commander).",
			"Skips wallpapers you've already downloaded.",
			"Auto-opens the destination folder when done.",
		],
		technologies: ["TypeScript", "Bun", "Commander", "Clack"],
		languages: ["TypeScript"],
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
		description: [
			"Browser-based network-attack tool for launching and monitoring HTTP/TCP load tests.",
			"Configure attack methods, proxy pools, and user agents from a Next.js dashboard.",
			"Web Workers run the traffic generation.",
			"Socket.IO streams live stats back to the UI.",
		],
		technologies: ["Next.js", "TypeScript", "Socket.IO", "Web Workers"],
		languages: ["TypeScript"],
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
		description: [
			"CLI tool that keeps your filesystem tidy.",
			"Sorts files into folders by keyword or extension.",
			"Built-in Fernet-based file encryption and decryption.",
			"Zip compress/extract utilities in a Click-powered interface.",
		],
		technologies: ["Python", "Click", "Cryptography"],
		languages: ["Python"],
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
		description: [
			"Tiny Python package powered by Robohash.org.",
			"Turns any hash string into a deterministic, reproducible avatar.",
			"Generate robots, monsters, robot heads, or kittens.",
			"Handy for auto-generating user avatars.",
		],
		technologies: ["Python", "PyPI"],
		languages: ["Python"],
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
