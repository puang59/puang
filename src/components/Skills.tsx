import Reveal from "./Reveal";
import { TechPill } from "./TechIcon";
import { Section } from "./frame";

const skills = [
	{
		title: "languages",
		logos: true,
		items: [
			"JavaScript",
			"TypeScript",
			"Python",
			"Java",
			"C",
			"C++",
			"Rust",
			"Go",
			"SQL",
			"Bash",
			"HTML/CSS",
		],
	},
	{
		title: "frontend",
		logos: true,
		items: [
			"React",
			"Next.js",
			"Astro",
			"React Native",
			"Expo",
			"Tailwind CSS",
			"shadcn",
			"Zustand",
			"Vite",
			"Tauri",
		],
	},
	{
		title: "backend",
		logos: true,
		items: [
			"Node.js",
			"Express",
			"Hono",
			"Bun",
			"Django",
			"Streamlit",
			"REST APIs",
			"WebSockets",
			"BullMQ",
			"Clerk",
			"Cloudflare Workers",
			"Go Colly",
			"GORM",
		],
	},
	{
		title: "data",
		logos: true,
		items: [
			"PostgreSQL",
			"SQLite",
			"MongoDB",
			"Redis",
			"Supabase",
			"Convex",
			"Prisma",
			"Pinecone",
		],
	},
	{
		title: "ai",
		logos: true,
		items: [
			"Vercel AI SDK",
			"LangChain",
			"RAG",
			"Vector Databases",
			"DeepInfra",
			"Exa",
		],
	},
	{
		title: "infra",
		logos: true,
		items: [
			"Docker",
			"Nginx",
			"Linux",
			"Ubuntu",
			"VPS",
			"PM2",
			"Vercel",
			"ngrok",
		],
	},
	{
		title: "tools",
		logos: true,
		items: [
			"VS Code",
			"Neovim",
			"tmux",
			"Git",
			"GitHub",
			"GitHub CLI",
			"GitHub Actions",
			"Lazygit",
			"Postman",
			"Yaak",
			"Figma",
			"npm",
			"Yarn",
		],
	},
	{
		title: "coursework",
		logos: false,
		items: [
			"Data Structures",
			"Operating Systems",
			"Computer Networks",
			"DBMS",
			"OOP",
			"Computer Architecture",
		],
	},
];

export default function Skills() {
	return (
		<Section index="04" title="Stack">
			<div className="space-y-5">
				{skills.map((group, i) => (
					<Reveal
						key={group.title}
						delay={i * 0.06}
						className="grid gap-2.5 sm:grid-cols-[96px_1fr] sm:gap-3"
					>
						<p className="pt-1 font-mono text-[11px] text-faint">
							{group.title}
						</p>
						<div className="flex flex-wrap gap-1.5">
							{group.items.map((item) =>
								group.logos ? (
									<TechPill key={item} name={item} />
								) : (
									<span
										key={item}
										className="cursor-default select-none rounded-md border border-line bg-surface px-2.5 py-1 text-muted text-xs transition-colors duration-300 ease-soft hover:border-edge hover:text-foreground"
									>
										{item}
									</span>
								),
							)}
						</div>
					</Reveal>
				))}
			</div>
		</Section>
	);
}
