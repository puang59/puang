"use client";

import { type ReactNode, useEffect, useState } from "react";

// Blurs the page out briefly while TransitionLink navigates.
export default function TransitionWrapper({
	children,
}: { children: ReactNode }) {
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		const start = () => setIsTransitioning(true);
		const complete = () => setTimeout(() => setIsTransitioning(false), 30);

		window.addEventListener("pageTransitionStart", start);
		window.addEventListener("pageTransitionComplete", complete);
		return () => {
			window.removeEventListener("pageTransitionStart", start);
			window.removeEventListener("pageTransitionComplete", complete);
		};
	}, []);

	return (
		<div
			className={`transition-wrapper ${isTransitioning ? "page-transition" : ""}`}
		>
			{children}
		</div>
	);
}
