import { RiArrowRightUpLine } from "@remixicon/react";
import Image from "next/image";
import type { ReactNode } from "react";

type Experience = {
	title: string;
	position: string;
	date: string;
	description: ReactNode;
	link: string;
	logo: string;
};

const experience: Experience[] = [
	{
		title: "ploglabs",
		position: "cofounder",
		date: "(june 2025 - present)",
		description:
			"a lab where we turn ai into practical tools that solve real problems for real people — fast, useful, and built for everyone.",
		link: "https://ploglabs.com",
		logo: "/roles/ploglabs.png",
	},
	{
		title: "yes bank",
		position: "artificial intelligence intern",
		date: "(may 2026 - jun 2026)",
		description:
			"developed enterprise ai and internal productivity solutions leveraging azure openai, next.js, and typescript, delivering real-time conversational interfaces and intelligent workflow automation for internal business operations. re-architected a python streamlit prototype into a production-oriented next.js application with secure authentication, transactional bulk provisioning workflows, and a scalable, modular system architecture for internal banking operations.",
		link: "https://www.yesbank.in",
		logo: "/roles/yes_bank_logo.jpeg",
	},
	{
		title: "thinkdeck",
		position: "full stack developer",
		date: "(may 2025 - july 2025)",
		description:
			"built scalable rest apis with go (gin) and fastapi, powering core platform features and ai-generated responses, with failure fallbacks and ratelimits that kept availability and performance high. designed and implemented token-based authentication, user rate-limiting, and middleware security layers, integrated rabbitmq and redis for async tasks, caching, and background job processing, and collaborated on system architecture design while deploying containerized services with docker.",
		link: "https://thinkdeck.site",
		logo: "/roles/thinkdeck_01_logo.jpeg",
	},
	{
		title: "greendot aviation",
		position: "chief vfx artist",
		date: "(sep 2022 - aug 2023)",
		description:
			"worked on creating visual effects for air crash investigation documentaries, designing and producing animations with adobe after effects and advanced vfx tools to support visually compelling storytelling and technical accuracy.",
		link: "https://www.youtube.com/@GreenDotAviation/",
		logo: "/roles/green_dot_aviation_limited_logo.jpeg",
	},
	{
		title: "watchout wearables",
		position: "social media marketing manager",
		date: "(2019 - 2021)",
		description: (
			<>
				managed the brand's social media presence and marketing campaigns to
				grow reach and engagement, contributing to the{" "}
				<a
					href="https://youtu.be/SqN1kiRdodk"
					target="_blank"
					rel="noopener noreferrer"
					className="relative z-10 text-green-300 underline decoration-green-300/40 underline-offset-2 transition-colors duration-300 hover:decoration-green-300"
				>
					shark tank india pitch
				</a>{" "}
				that secured ₹1 crore in funding at a ₹10 crore valuation.
			</>
		),
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

								<p className="mt-4 max-w-[95%] text-gray-400 text-sm leading-relaxed">
									{exp.description}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
