"use client";
import { type ReactNode, useRef } from "react";
import { playNote } from "~/lib/sound";

// Plays a note as the pointer moves onto each contribution cell.
export default function ChartSounds({ children }: { children: ReactNode }) {
	const last = useRef<Element | null>(null);

	return (
		<div
			onPointerOver={(e) => {
				const cell = (e.target as Element).closest("[data-level]");
				if (!cell || cell === last.current) return;
				last.current = cell;
				const { row, week, level } = (cell as HTMLElement).dataset;
				playNote(Number(row), Number(week), Number(level));
			}}
			onPointerLeave={() => {
				last.current = null;
			}}
		>
			{children}
		</div>
	);
}
