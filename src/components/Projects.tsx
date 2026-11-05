export type MediaItem =
	| { type: "image"; src: string; alt: string }
	| { type: "video"; src: string }
	| { type: "youtube"; id: string }
	| { type: "tweet"; id: string };

export type ProjectLink = {
	label: string;
	url: string;
	type: "live" | "demo" | "github" | "npm" | "pypi" | "blog";
};

export type Project = {
	title: string;
	overview: string;
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
		overview:
			"devdoq takes an entire codebase and turns it into living documentation: auto-generated docs, API references and a visual mindmap of how the pieces fit together. Repos are chunked and vector-indexed with CocoIndex, while BullMQ-backed workers spread doc generation across threads so even large projects finish quickly. Once indexed, you can chat with the code directly instead of digging through files. It grew to 700+ users and 650+ beta testers, generating over 10K docs.",
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
		stats: [
			"700+ users",
			"10K+ docs generated",
			"650+ beta testers",
			"21.1K impressions",
			"943 engagements",
		],
		media: [
			{ type: "image", src: "/devdoq/cover.png", alt: "devdoq preview" },
			{ type: "tweet", id: "1937491944982339706" },
		],
		links: [{ label: "Live", url: "https://devdoq.com", type: "live" }],
	},
	{
		title: "nuza",
		overview:
			"nuza is a fast, privacy-first, open-source take on Obsidian. It's a native Tauri + React desktop app that works strictly with files on your own disk, with no cloud and no sync service. The editor is built on CodeMirror 6 with Vim keybindings out of the box, and the UI stays deliberately minimal so the notes stay in focus. Across 33 releases it has passed 877 downloads on macOS, Windows and Linux.",
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
		stats: [
			"877 downloads",
			"33 releases",
			"314 macOS installs",
			"284 Linux installs",
			"279 Windows installs",
		],
		media: [
			{ type: "video", src: "https://nuza-cdn.puang.in/nuza-intro-v3.mp4" },
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
		overview:
			"tars is an AI companion for your clipboard. Hit a global hotkey anywhere on your system and it reads what you've copied, or what's on screen, and answers questions about it through an LLM, without switching apps. It's a Tauri desktop app with a React frontend, and history syncs through Supabase so past answers are always there.",
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
		overview:
			"molly is a realtime Discord client that lives entirely in the terminal. Built with Charm's Bubble Tea, it supports full messaging, channel switching, DMs and notifications through a fast, keyboard-driven interface. A WebSocket connection keeps it live while a local SQLite cache keeps it snappy. The launch post reached 442K+ impressions across 107K unique visitors.",
		description: [
			"Terminal-native, realtime Discord chat client built with Charm's Bubble Tea.",
			"Full messaging, channel switching, DMs, and notifications.",
			"Fast, keyboard-driven TUI.",
			"WebSocket connection backed by a local SQLite cache.",
		],
		technologies: ["Go", "Bubble Tea", "WebSocket", "SQLite"],
		languages: ["Go", "TypeScript"],
		stats: [
			"40+ GitHub stars",
			"442.2K impressions",
			"136.7K views",
			"107K unique visitors",
			"15.8K engagements",
			"1.22K likes",
			"86 reposts",
		],
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
		overview:
			"zeno is a coding agent that runs entirely on your machine from the terminal. It reads your local codebase, git history and files to investigate issues and ship changes, and only calls out to an LLM via the OpenAI SDK when it actually needs to reason. Every file and git operation stays local.",
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
		overview:
			"xtoxic analyzes how toxic a Twitter account is, in real time. Give it a handle and Exa pulls the recent tweets, Gemini scores them through the Vercel AI SDK, and the breakdown streams back instantly. Built and shipped in under an hour, it picked up 12,000+ users and 50K+ impressions in its first 12 hours.",
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
		overview:
			"A multi-threaded HTTP server written from scratch in C, with no frameworks, just raw POSIX sockets and a thread-per-connection model. Requests go through a hand-rolled parser with regex-based routing, MIME detection and URL decoding. It's tuned for throughput with a small memory footprint, reaching 9,000+ requests per second at 2.8ms latency. The full build is written up on the blog.",
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
		overview:
			"lexit is a personal vocabulary builder. Add a word and Gemini generates a definition with usage examples, then it's saved to a real-time Convex database so it's instantly searchable on every device. Clerk handles authentication and Upstash rate-limits the AI endpoints.",
		description: [
			"Personal vocabulary builder with AI-generated definitions and usage examples via Gemini.",
			"Saves each word to a real-time Convex database, instantly searchable across devices.",
			"Clerk authentication.",
			"Upstash-backed rate limiting on the AI endpoints.",
		],
		technologies: ["Next.js", "Convex", "Gemini AI", "Clerk", "Zustand"],
		languages: ["TypeScript"],
		stats: ["24.2K impressions", "316 engagements", "68 likes"],
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
		overview:
			"internode is a self-hosted search engine. A Go backend built on Gin and Colly recursively crawls and indexes the web, exposing both full search and quick-search endpoints, while a Next.js frontend queries them in real time.",
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
		overview:
			"wallgrab is a CLI for finding and downloading high-res wallpapers from Wallhaven. Use the guided wizard built with Clack, or script it with flags through Commander. It skips anything you've already downloaded and opens the destination folder when it's done. Published on npm with 128+ downloads.",
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
		overview:
			"smacknet is a browser-based tool for launching and monitoring HTTP and TCP load tests. Attack methods, proxy pools and user agents are configured from a Next.js dashboard, Web Workers generate the traffic, and Socket.IO streams live stats back to the UI as the test runs.",
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
		overview:
			"FileEase is a CLI that keeps your filesystem tidy. It sorts files into folders by keyword or extension, encrypts and decrypts files with Fernet, and compresses or extracts zip archives, all from one Click-powered interface.",
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
		overview:
			"RoboArt is a tiny Python package powered by Robohash.org. It turns any hash string into a deterministic avatar, so the same input always gives the same image, in robot, monster, robot-head or kitten styles. Handy for auto-generating user avatars. Published on PyPI.",
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

export const projectSlug = (project: Project) =>
	project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const getProject = (slug: string) =>
	projectList.find((project) => projectSlug(project) === slug);

export const projectCover = (project: Project) => {
	for (const item of project.media) {
		if (item.type === "image") return { src: item.src, alt: item.alt };
		if (item.type === "youtube")
			return {
				src: `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`,
				alt: `${project.title} demo`,
			};
	}
	return null;
};

export const isLive = (project: Project) =>
	project.links.some((link) => link.type === "live");
