import {
	RiBrainLine,
	RiCodeSSlashLine,
	RiCpuLine,
	RiDatabase2Line,
	RiExchangeLine,
	RiPlugLine,
	RiSearchLine,
	RiServerLine,
	RiStackLine,
	RiTerminalBoxLine,
} from "@remixicon/react";
import type { CSSProperties } from "react";
import {
	type SimpleIcon,
	siAstro,
	siBun,
	siC,
	siClerk,
	siCloudflareworkers,
	siCodemirror,
	siConvex,
	siCplusplus,
	siDjango,
	siDocker,
	siExpo,
	siExpress,
	siFigma,
	siGin,
	siGit,
	siGithub,
	siGithubactions,
	siGnubash,
	siGo,
	siGooglegemini,
	siHono,
	siHtml5,
	siJavascript,
	siLangchain,
	siLinux,
	siMongodb,
	siNeovim,
	siNextdotjs,
	siNginx,
	siNgrok,
	siNodedotjs,
	siNpm,
	siOpenjdk,
	siPm2,
	siPostgresql,
	siPostman,
	siPrisma,
	siPypi,
	siPython,
	siReact,
	siRedis,
	siRust,
	siShadcnui,
	siSocketdotio,
	siSqlite,
	siStreamlit,
	siSupabase,
	siTailwindcss,
	siTauri,
	siTmux,
	siTypescript,
	siUbuntu,
	siVercel,
	siVite,
	siYaak,
	siYarn,
	siZod,
} from "simple-icons";

const icons: Record<string, SimpleIcon> = {
	javascript: siJavascript,
	typescript: siTypescript,
	python: siPython,
	rust: siRust,
	java: siOpenjdk,
	c: siC,
	"c++": siCplusplus,
	bash: siGnubash,
	"html/css": siHtml5,
	neovim: siNeovim,
	git: siGit,
	lazygit: siGit,
	github: siGithub,
	"github actions": siGithubactions,
	docker: siDocker,
	postman: siPostman,
	tmux: siTmux,
	ngrok: siNgrok,
	linux: siLinux,
	"node.js": siNodedotjs,
	express: siExpress,
	hono: siHono,
	"next.js": siNextdotjs,
	react: siReact,
	"react native": siReact,
	tauri: siTauri,
	"cloudflare workers": siCloudflareworkers,
	supabase: siSupabase,
	redis: siRedis,
	mongodb: siMongodb,
	convex: siConvex,
	"ai sdk": siVercel,
	"vercel ai sdk": siVercel,
	codemirror: siCodemirror,
	vite: siVite,
	"tailwind css": siTailwindcss,
	go: siGo,
	sqlite: siSqlite,
	bun: siBun,
	zod: siZod,
	gemini: siGooglegemini,
	"gemini ai": siGooglegemini,
	clerk: siClerk,
	gin: siGin,
	"socket.io": siSocketdotio,
	pypi: siPypi,
	astro: siAstro,
	expo: siExpo,
	shadcn: siShadcnui,
	django: siDjango,
	streamlit: siStreamlit,
	postgresql: siPostgresql,
	prisma: siPrisma,
	langchain: siLangchain,
	nginx: siNginx,
	pm2: siPm2,
	vercel: siVercel,
	figma: siFigma,
	npm: siNpm,
	yarn: siYarn,
	yaak: siYaak,
	ubuntu: siUbuntu,
	"github cli": siGithub,
	"go colly": siGo,
	gorm: siGo,
};

const fallbacks: Record<string, typeof RiCodeSSlashLine> = {
	sql: RiDatabase2Line,
	pinecone: RiDatabase2Line,
	"vector databases": RiDatabase2Line,
	"vs code": RiTerminalBoxLine,
	"rest apis": RiExchangeLine,
	websockets: RiPlugLine,
	rag: RiBrainLine,
	deepinfra: RiCpuLine,
	exa: RiSearchLine,
	vps: RiServerLine,
	bullmq: RiStackLine,
};

// Near-black brand colours would disappear on the dark background,
// so those brighten to the foreground colour on hover instead.
const brandColor = (hex: string) => {
	const n = Number.parseInt(hex, 16);
	const lum = 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
	return lum < 60 ? "#ededea" : `#${hex}`;
};

export function TechIcon({ name, size = 14 }: { name: string; size?: number }) {
	const icon = icons[name.toLowerCase()];
	if (!icon) {
		const Fallback = fallbacks[name.toLowerCase()] ?? RiCodeSSlashLine;
		return <Fallback size={size} className="shrink-0" />;
	}
	return (
		<svg
			role="img"
			aria-hidden="true"
			viewBox="0 0 24 24"
			width={size}
			height={size}
			className="shrink-0 fill-current"
		>
			<path d={icon.path} />
		</svg>
	);
}

// Pill with a logo that stays monochrome until hovered.
export function TechPill({ name }: { name: string }) {
	const icon = icons[name.toLowerCase()];
	return (
		<span
			style={
				{ "--brand": icon ? brandColor(icon.hex) : "#ededea" } as CSSProperties
			}
			className="group/pill inline-flex cursor-default select-none items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1 text-muted text-xs transition-colors duration-300 ease-soft hover:border-edge hover:text-foreground"
		>
			<span className="text-faint transition-colors duration-300 ease-soft group-hover/pill:text-[var(--brand)]">
				<TechIcon name={name} />
			</span>
			{name}
		</span>
	);
}
