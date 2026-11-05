import { RiArrowLeftLine } from "@remixicon/react";
import Footer from "~/components/Footer";
import MissingPath from "~/components/MissingPath";
import Reveal from "~/components/Reveal";
import { Frame, Section } from "~/components/frame";
import TransitionLink from "~/components/utils/TransitionLink";

const elsewhere = [
	{ href: "/projects", label: "projects" },
	{ href: "/blog", label: "writing" },
];

export default function NotFound() {
	return (
		<Frame>
			<Section
				divider={false}
				className="flex flex-1 flex-col justify-center px-5 py-20 sm:px-8"
			>
				<Reveal>
					<div className="hatch-rail relative mb-10 flex h-36 items-center justify-center overflow-hidden rounded-lg border border-line sm:h-44">
						<span className="bg-background px-4 font-semibold text-[72px] text-foreground tabular-nums leading-none tracking-tighter sm:text-[96px]">
							404
						</span>
					</div>
				</Reveal>

				<Reveal delay={0.08}>
					<h1 className="font-semibold text-2xl text-foreground tracking-tight">
						This page wandered off.
					</h1>
					<p className="mt-3 text-[15px] text-muted leading-relaxed">
						Whatever was here has moved, been renamed, or never existed in the
						first place.
					</p>
				</Reveal>

				<Reveal delay={0.14} className="mt-6">
					<MissingPath />
				</Reveal>

				<Reveal
					delay={0.2}
					className="mt-8 ml-1 flex flex-wrap items-center gap-4"
				>
					<TransitionLink href="/" className="group btn btn-primary">
						<RiArrowLeftLine
							size={15}
							className="group-hover:-translate-x-0.5 transition-transform duration-300 ease-soft"
						/>
						Take me home
					</TransitionLink>
					{elsewhere.map((link) => (
						<TransitionLink
							key={link.href}
							href={link.href}
							className="btn btn-secondary"
						>
							{link.label}
						</TransitionLink>
					))}
				</Reveal>
			</Section>
			<Footer />
		</Frame>
	);
}

export const metadata = {
	title: "Not found",
};
