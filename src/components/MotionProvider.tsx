"use client";
import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

// Loads only the DOM animation features we use, keeping framer-motion's
// bundle small. Components use the lightweight `m` element instead of `motion`.
export default function MotionProvider({ children }: { children: ReactNode }) {
	return (
		<LazyMotion features={domAnimation} strict>
			{children}
		</LazyMotion>
	);
}
