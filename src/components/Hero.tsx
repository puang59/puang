import { RiArrowRightUpLine, RiMailLine } from "@remixicon/react";
import Image from "next/image";
import LocalTime from "./LocalTime";
import Rise from "./Rise";
import SoundToggle from "./SoundToggle";
import VisitorCount from "./VisitorCount";

export default function Hero() {
	return (
		<section className="px-5 pt-12 pb-10 sm:px-8 sm:pt-20">
			<Rise className="mb-12 flex items-center justify-between">
				<LocalTime />
				<div className="flex items-center gap-2">
					<SoundToggle />
					<VisitorCount />
				</div>
			</Rise>

			<Rise delay={0.06}>
				<h1 className="font-semibold text-[28px] text-foreground leading-[1.25] tracking-tight sm:text-[32px]">
					Hi, I'm{" "}
					<span className="group relative inline-block h-9 w-9 overflow-hidden rounded-full align-[-6px] ring-1 ring-edge sm:h-10 sm:w-10">
						<Image
							src="/puang2.jpg"
							alt="Karan Kumar"
							fill
							sizes="40px"
							priority
							className="object-cover grayscale transition-[filter] duration-700 ease-soft group-hover:grayscale-0"
						/>
					</span>{" "}
					Karan.{" "}
					<span className="text-muted">
						I build web apps, CLI tools and AI agent pipelines.
					</span>
				</h1>
			</Rise>

			<Rise delay={0.12}>
				<div className="mt-5 space-y-3 text-[15px] text-muted leading-relaxed">
					<p>
						I'm a CS undergrad at VIT Chennai. I co-founded{" "}
						<span className="text-foreground">ploglabs</span>, where we turn AI
						into practical tools, and I'm a core maintainer of{" "}
						<a
							href="https://turflang.org"
							target="_blank"
							rel="noopener noreferrer"
							className="text-foreground underline decoration-edge underline-offset-4 transition-colors duration-300 hover:decoration-foreground"
						>
							turflang
						</a>
						, a statically typed systems language compiled through LLVM.
					</p>
					<p>
						Most of my college life has gone into building startups and
						products, with{" "}
						<a
							href="https://devdoq.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-foreground underline decoration-edge underline-offset-4 transition-colors duration-300 hover:decoration-foreground"
						>
							devdoq
						</a>{" "}
						taking the biggest share. I love shipping production-grade things
						that solve real problems, and watching people actually use them.
					</p>
					<p>
						Lately I've been exploring the other half:{" "}
						<span className="text-foreground">
							GTM, marketing and distribution
						</span>
						. A great product only matters once it reaches the right people.
					</p>
					<p>Always open to new roles, collaborations and interesting work.</p>
				</div>
			</Rise>

			<Rise
				delay={0.18}
				className="mt-8 ml-1 flex flex-wrap items-center gap-4"
			>
				<a href="mailto:hello@puang.in" className="btn btn-primary">
					<RiMailLine size={15} />
					Send an email
				</a>
				<a
					href="/resume.pdf"
					target="_blank"
					rel="noopener noreferrer"
					className="group btn btn-secondary"
				>
					Resume
					<RiArrowRightUpLine
						size={14}
						className="group-hover:-translate-y-px text-faint transition-transform duration-300 ease-soft group-hover:translate-x-px"
					/>
				</a>
			</Rise>
		</section>
	);
}
