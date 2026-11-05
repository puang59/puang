import type { ReactNode } from "react";

// Hatched strip that runs down each side of the content column.
function Rail({ side }: { side: "left" | "right" }) {
	return (
		<div
			aria-hidden="true"
			className={`hatch-rail pointer-events-none absolute inset-y-0 hidden w-5 border-line border-x sm:block ${
				side === "left" ? "right-full" : "left-full"
			}`}
		/>
	);
}

export function Frame({ children }: { children: ReactNode }) {
	return (
		<main className="relative mx-auto flex min-h-screen w-full max-w-[760px] flex-col">
			<Rail side="left" />
			<Rail side="right" />
			{children}
		</main>
	);
}

// Slowly drifting wave that separates sections.
function Squiggle() {
	return (
		<div
			aria-hidden="true"
			className="squiggle pointer-events-none absolute inset-x-5 top-0 h-3 sm:inset-x-8"
		/>
	);
}

export function Section({
	id,
	divider = true,
	index,
	title,
	action,
	children,
	className = "px-5 py-10 sm:px-8",
}: {
	id?: string;
	divider?: boolean | "line";
	index?: string;
	title?: ReactNode;
	action?: ReactNode;
	children: ReactNode;
	className?: string;
}) {
	return (
		<section id={id} className={`relative scroll-mt-8 ${className}`}>
			{divider === "line" ? (
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-x-5 top-1.5 h-px bg-line sm:inset-x-8"
				/>
			) : (
				divider && <Squiggle />
			)}
			{(title || action) && (
				<div className="mb-6 flex items-baseline justify-between gap-4">
					{title && (
						<h2 className="flex items-baseline gap-3 text-[15px]">
							{index && (
								<span className="font-mono text-[11px] text-faint tabular-nums">
									{index}
								</span>
							)}
							<span className="font-medium text-foreground">{title}</span>
						</h2>
					)}
					{action}
				</div>
			)}
			{children}
		</section>
	);
}
