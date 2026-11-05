import type { ReactNode } from "react";

// CSS-only counterpart to Reveal for content that is visible on load.
export default function Rise({
	children,
	delay = 0,
	className = "",
}: {
	children: ReactNode;
	delay?: number;
	className?: string;
}) {
	return (
		<div
			className={`rise ${className}`}
			style={{ animationDelay: `${delay}s` }}
		>
			{children}
		</div>
	);
}
