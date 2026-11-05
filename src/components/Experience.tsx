"use client";
import { RiArrowDownSLine, RiArrowRightUpLine } from "@remixicon/react";
import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import { Fragment, type ReactNode, useState } from "react";
import Reveal from "./Reveal";
import { Section } from "./frame";

type Experience = {
	title: string;
	position: string;
	date: string;
	duration?: string;
	location?: string;
	points: ReactNode[];
	link: string;
	logo: string;
};

const H = ({ children }: { children: ReactNode }) => (
	<span className="font-medium text-foreground">{children}</span>
);

const experience: Experience[] = [
	{
		title: "turflang",
		position: "core maintainer",
		date: "(jan 2026 - present)",
		points: [
			<Fragment key="p1">
				core maintainer of <H>turf</H>, a statically typed,{" "}
				<H>aot-compiled systems language</H> targeting native executables via{" "}
				<H>llvm</H> — structs, enums, generics, pattern matching, error unions,
				and a gc'd heap with checked references.
			</Fragment>,
			<Fragment key="p2">
				help ship the <H>turf cli</H> (build/run/test/fmt/check), an{" "}
				<H>lsp server</H>, and a <H>standard library</H> covering strings,
				collections, files, json, http, and sockets; each release bundles its
				own llvm, linker, and runtime.
			</Fragment>,
			<Fragment key="p3">
				maintain <H>ci across 4 tier-1 platforms</H> (linux x86-64/arm64,
				windows x86-64, macos arm64), gating releases; grown to{" "}
				<H>1,200+ commits</H>, <H>78k loc</H>, and <H>v2.1.1</H> with a 3-person
				core team over 10 months.
			</Fragment>,
		],
		link: "https://turflang.org",
		logo: "/roles/turflang.png",
	},
	{
		title: "ploglabs",
		position: "cofounder",
		date: "(june 2025 - present)",
		points: [
			<Fragment key="p4">
				a lab where we turn <H>ai into practical tools</H> that solve real
				problems for real people — fast, useful, and built for everyone.
			</Fragment>,
			<Fragment key="p5">
				built <H>devdoq</H> under ploglabs, an ai codebase documentation
				platform that grew to <H>700+ users</H> and <H>650+ beta testers</H>,
				generating <H>10k+ docs</H>.
			</Fragment>,
			<Fragment key="p6">
				built <H>molly</H> under ploglabs, a terminal-native discord client that
				reached <H>40+ github stars</H> and <H>442k+ impressions</H> across 107k
				unique visitors.
			</Fragment>,
		],
		link: "https://ploglabs.com",
		logo: "/roles/ploglabs.png",
	},
	{
		title: "yes bank",
		position: "artificial intelligence intern",
		date: "(may 2026 - jun 2026)",
		duration: "2 mos",
		location: "mumbai · on-site",
		points: [
			<Fragment key="p7">
				developed <H>enterprise ai</H> and internal productivity solutions using{" "}
				<H>azure openai</H>, next.js, and typescript, delivering real-time
				conversational interfaces and intelligent workflow automation.
			</Fragment>,
			<Fragment key="p8">
				re-architected a <H>python streamlit prototype</H> into a
				production-oriented <H>next.js application</H> with secure
				authentication, transactional bulk provisioning workflows, and a
				scalable, modular architecture for internal banking operations.
			</Fragment>,
		],
		link: "https://www.yesbank.in",
		logo: "/roles/yes_bank_logo.jpeg",
	},
	{
		title: "thinkdeck",
		position: "full stack developer",
		date: "(may 2025 - jul 2025)",
		duration: "3 mos",
		location: "remote",
		points: [
			<Fragment key="p9">
				built scalable <H>rest apis</H> with <H>go (gin)</H> and <H>fastapi</H>,
				powering core platform features and ai-generated responses, with failure
				fallbacks and rate limits that kept availability high.
			</Fragment>,
			<Fragment key="p10">
				designed and implemented <H>token-based authentication</H>, user
				rate-limiting, and middleware security layers.
			</Fragment>,
			<Fragment key="p11">
				integrated <H>rabbitmq</H> and <H>redis</H> for async tasks, caching,
				and background jobs, and collaborated on system architecture while
				deploying containerized services with <H>docker</H>.
			</Fragment>,
		],
		link: "https://thinkdeck.site",
		logo: "/roles/thinkdeck_01_logo.jpeg",
	},
	{
		title: "greendot aviation",
		position: "chief vfx artist",
		date: "(nov 2022 - nov 2023)",
		duration: "1 yr 1 mo",
		location: "remote",
		points: [
			<Fragment key="p12">
				created <H>visual effects</H> for{" "}
				<H>air crash investigation documentaries</H>, supporting compelling
				storytelling and technical accuracy.
			</Fragment>,
			<Fragment key="p13">
				designed and produced animations with <H>adobe after effects</H> and
				advanced vfx tools.
			</Fragment>,
		],
		link: "https://www.youtube.com/@GreenDotAviation/",
		logo: "/roles/green_dot_aviation_limited_logo.jpeg",
	},
	{
		title: "watchout wearables",
		position: "social media marketing manager",
		date: "(2019 - 2021)",
		location: "remote",
		points: [
			<Fragment key="p14">
				managed the brand's <H>social media presence</H> and marketing campaigns
				to grow reach and engagement.
			</Fragment>,
			<Fragment key="p15">
				contributed to the{" "}
				<a
					href="https://youtu.be/SqN1kiRdodk"
					target="_blank"
					rel="noopener noreferrer"
					className="text-foreground underline decoration-faint underline-offset-2 transition-colors duration-300 hover:decoration-foreground"
				>
					shark tank india pitch
				</a>{" "}
				that secured <H>₹1 crore</H> in funding at a <H>₹10 crore valuation</H>.
			</Fragment>,
		],
		link: "https://www.watchoutwearables.com/",
		logo: "/roles/watchoutwearables.jpeg",
	},
];

// "jan 2026 - present" -> "2026 — now", "may 2025 - july 2025" -> "2025"
const years = (date: string) => {
	const [from = "", to = ""] = date.split(" - ").map((part) => {
		if (part.trim() === "present") return "now";
		return part.trim().split(" ").pop() ?? "";
	});
	return from === to ? from : `${from} — ${to}`;
};

export default function Experience() {
	const [open, setOpen] = useState<string | null>(null);

	return (
		<Section index="02" title="Work">
			<div className="-mx-3 space-y-0.5">
				{experience.map((exp, i) => {
					const isOpen = open === exp.title;
					const date = exp.date.replace(/[()]/g, "");
					return (
						<Reveal key={exp.title} delay={i * 0.05}>
							<div
								className={`group rounded-lg transition-colors duration-300 ease-soft ${
									isOpen ? "bg-surface" : "hover:bg-surface/60"
								}`}
							>
								<button
									type="button"
									aria-expanded={isOpen}
									onClick={() => setOpen(isOpen ? null : exp.title)}
									className="flex w-full items-center gap-3 px-3 py-2.5 text-left"
								>
									<span className="hidden w-24 shrink-0 font-mono text-[11px] text-faint tabular-nums sm:block">
										{years(date)}
									</span>
									<Image
										src={exp.logo}
										alt={`${exp.title} logo`}
										width={28}
										height={28}
										className={`h-7 w-7 shrink-0 rounded-[5px] bg-raised object-contain ring-1 ring-line transition-[filter] duration-500 ease-soft group-hover:grayscale-0 ${
											isOpen ? "grayscale-0" : "grayscale"
										}`}
									/>
									<p className="min-w-0 flex-1 truncate text-sm">
										<span className="font-medium text-foreground">
											{exp.title}
										</span>
										<span className="text-faint"> · {exp.position}</span>
									</p>
									<RiArrowDownSLine
										size={16}
										className={`shrink-0 text-faint transition-transform duration-500 ease-soft ${
											isOpen ? "rotate-180 text-muted" : ""
										}`}
									/>
								</button>

								<AnimatePresence initial={false}>
									{isOpen && (
										<m.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "auto", opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
											className="overflow-hidden"
										>
											<div className="pr-3 pb-4 pl-[52px] sm:pl-[160px]">
												<p className="mb-3 font-mono text-[11px] text-faint">
													{[date, exp.duration, exp.location]
														.filter(Boolean)
														.join("  ·  ")}
												</p>
												<ul className="space-y-2 text-muted text-sm leading-relaxed">
													{exp.points.map((point, j) => (
														<li
															key={`${exp.title}-${j}`}
															className="flex gap-2.5"
														>
															<span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-faint" />
															<span>{point}</span>
														</li>
													))}
												</ul>
												<a
													href={exp.link}
													target="_blank"
													rel="noopener noreferrer"
													className="mt-4 inline-flex items-center gap-1 text-faint text-xs transition-colors duration-300 hover:text-foreground"
												>
													{exp.link
														.replace(/^https?:\/\/(www\.)?/, "")
														.replace(/\/$/, "")}
													<RiArrowRightUpLine size={13} />
												</a>
											</div>
										</m.div>
									)}
								</AnimatePresence>
							</div>
						</Reveal>
					);
				})}
			</div>
		</Section>
	);
}
