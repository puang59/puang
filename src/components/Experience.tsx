import { RiArrowRightUpLine } from "@remixicon/react";
import Image from "next/image";
import { Fragment, type ReactNode } from "react";

type Experience = {
	title: string;
	position: string;
	date: string;
	points: ReactNode[];
	link: string;
	logo: string;
};

const experience: Experience[] = [
	{
		title: "turflang",
		position: "core maintainer",
		date: "(jan 2026 - present)",
		points: [
			"core maintainer of turf, a statically typed, aot-compiled systems language targeting native executables via llvm — structs, enums, generics, pattern matching, error unions, and a gc'd heap with checked references.",
			"help ship the turf cli (build/run/test/fmt/check), an lsp server, and a standard library covering strings, collections, files, json, http, and sockets; each release bundles its own llvm, linker, and runtime.",
			"maintain ci testing every change across 4 tier-1 platforms (linux x86-64/arm64, windows x86-64, macos arm64), gating releases; grown to 1,200+ commits, 78k loc, and v2.1.1 with a 3-person core team over 10 months.",
		],
		link: "https://turflang.org",
		logo: "/roles/turflang.png",
	},
	{
		title: "ploglabs",
		position: "cofounder",
		date: "(june 2025 - present)",
		points: [
			"a lab where we turn ai into practical tools that solve real problems for real people — fast, useful, and built for everyone.",
			"built devdoq under ploglabs, an ai codebase documentation platform that grew to 700+ users and 650+ beta testers, generating 10k+ docs.",
			"built molly under ploglabs, a terminal-native discord client that reached 40+ github stars and 442k+ impressions across 107k unique visitors.",
		],
		link: "https://ploglabs.com",
		logo: "/roles/ploglabs.png",
	},
	{
		title: "yes bank",
		position: "artificial intelligence intern",
		date: "(may 2026 - jun 2026)",
		points: [
			"developed enterprise ai and internal productivity solutions using azure openai, next.js, and typescript, delivering real-time conversational interfaces and intelligent workflow automation for internal business operations.",
			"re-architected a python streamlit prototype into a production-oriented next.js application with secure authentication, transactional bulk provisioning workflows, and a scalable, modular architecture for internal banking operations.",
		],
		link: "https://www.yesbank.in",
		logo: "/roles/yes_bank_logo.jpeg",
	},
	{
		title: "thinkdeck",
		position: "full stack developer",
		date: "(may 2025 - july 2025)",
		points: [
			"built scalable rest apis with go (gin) and fastapi, powering core platform features and ai-generated responses, with failure fallbacks and rate limits that kept availability and performance high.",
			"designed and implemented token-based authentication, user rate-limiting, and middleware security layers.",
			"integrated rabbitmq and redis for async tasks, caching, and background job processing, and collaborated on system architecture while deploying containerized services with docker.",
		],
		link: "https://thinkdeck.site",
		logo: "/roles/thinkdeck_01_logo.jpeg",
	},
	{
		title: "greendot aviation",
		position: "chief vfx artist",
		date: "(sep 2022 - aug 2023)",
		points: [
			"created visual effects for air crash investigation documentaries, supporting visually compelling storytelling and technical accuracy.",
			"designed and produced animations with adobe after effects and advanced vfx tools.",
		],
		link: "https://www.youtube.com/@GreenDotAviation/",
		logo: "/roles/green_dot_aviation_limited_logo.jpeg",
	},
	{
		title: "watchout wearables",
		position: "social media marketing manager",
		date: "(2019 - 2021)",
		points: [
			"managed the brand's social media presence and marketing campaigns to grow reach and engagement.",
			<Fragment key="shark-tank">
				contributed to the{" "}
				<a
					href="https://youtu.be/SqN1kiRdodk"
					target="_blank"
					rel="noopener noreferrer"
					className="relative z-10 text-green-300 underline decoration-green-300/40 underline-offset-2 transition-colors duration-300 hover:decoration-green-300"
				>
					shark tank india pitch
				</a>{" "}
				that secured ₹1 crore in funding at a ₹10 crore valuation.
			</Fragment>,
		],
		link: "https://www.watchoutwearables.com/",
		logo: "/roles/watchoutwearables.jpeg",
	},
];

export default function Experience() {
	return (
		<div className="mb-16 text-white">
			<h1 className="mb-8 font-bold text-2xl text-white">
				<span className="text-green-300">&gt;</span> work
			</h1>
			<div className="grid grid-cols-1 gap-2">
				{experience.map((exp) => (
					<div
						key={exp.title}
						className="-mx-6 group relative block p-6 transition-all duration-300 hover:border-green-300/30 hover:bg-zinc-900/50"
					>
						<a
							href={exp.link}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Open ${exp.title}`}
							className="absolute inset-0 z-0"
						>
							<span className="sr-only">Open {exp.title}</span>
						</a>
						<div className="group-hover:-translate-y-0.5 absolute top-5 right-5 text-gray-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-green-300">
							<RiArrowRightUpLine size={20} />
						</div>

						<div className="flex gap-4">
							<Image
								src={exp.logo}
								alt={`${exp.title} logo`}
								width={44}
								height={44}
								className="h-11 w-11 shrink-0 border border-zinc-800 bg-zinc-950 object-contain"
							/>

							<div className="flex-1">
								<div className="flex flex-col gap-1 pr-6">
									<h2 className="font-bold text-white text-xl transition-colors duration-300 group-hover:text-green-300">
										{exp.title}
									</h2>
									<p className="font-mono text-gray-500 text-xs">
										{exp.position} <span className="mx-1 text-zinc-700">|</span>{" "}
										{exp.date}
									</p>
								</div>

								<ul className="mt-4 max-w-[95%] space-y-1.5 text-gray-400 text-sm leading-relaxed">
									{exp.points.map((point, i) => (
										<li key={`${exp.title}-${i}`} className="flex gap-2">
											<span className="text-green-300/60">•</span>
											<span>{point}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
