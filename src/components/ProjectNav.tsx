"use client";
import { RiArrowLeftLine } from "@remixicon/react";
import { useSearchParams } from "next/navigation";
import { type ReactNode, Suspense } from "react";
import TransitionLink from "./utils/TransitionLink";

const backClass =
	"group inline-flex items-center gap-1.5 font-mono text-[11px] text-faint transition-colors duration-300 hover:text-foreground";

type BackTarget = { href: string; label: string; homeHref: string };

function BackLinkInner({ href, label, homeHref }: BackTarget) {
	const fromHome = useSearchParams().get("from") === "home";
	return (
		<TransitionLink href={fromHome ? homeHref : href} className={backClass}>
			<RiArrowLeftLine
				size={13}
				className="group-hover:-translate-x-0.5 transition-transform duration-300 ease-soft"
			/>
			{fromHome ? "home" : label}
		</TransitionLink>
	);
}

// Sends the reader back to wherever they opened the page from: the home page
// when the link carried ?from=home, otherwise the section's own index page.
export function OriginBackLink(target: BackTarget) {
	return (
		<Suspense
			fallback={
				<TransitionLink href={target.href} className={backClass}>
					<RiArrowLeftLine size={13} />
					{target.label}
				</TransitionLink>
			}
		>
			<BackLinkInner {...target} />
		</Suspense>
	);
}

export function ProjectBackLink() {
	return (
		<OriginBackLink href="/projects" label="projects" homeHref="/#projects" />
	);
}

function KeepFromInner({
	href,
	className,
	children,
}: {
	href: string;
	className: string;
	children: ReactNode;
}) {
	const from = useSearchParams().get("from");
	return (
		<TransitionLink
			href={from ? `${href}?from=${from}` : href}
			className={className}
		>
			{children}
		</TransitionLink>
	);
}

// Link between projects that keeps the ?from origin so "back" still works.
export function KeepFromLink(props: {
	href: string;
	className: string;
	children: ReactNode;
}) {
	return (
		<Suspense
			fallback={
				<TransitionLink href={props.href} className={props.className}>
					{props.children}
				</TransitionLink>
			}
		>
			<KeepFromInner {...props} />
		</Suspense>
	);
}
