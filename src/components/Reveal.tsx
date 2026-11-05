"use client";
import { m } from "framer-motion";
import type { ReactNode } from "react";

// Fades content up out of a light blur the first time it scrolls into view.
export default function Reveal({
	children,
	delay = 0,
	className,
}: {
	children: ReactNode;
	delay?: number;
	className?: string;
}) {
	return (
		<m.div
			className={className}
			initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
			whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			viewport={{ once: true, margin: "-40px" }}
			transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
		>
			{children}
		</m.div>
	);
}
