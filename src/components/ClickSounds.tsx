"use client";
import { useEffect } from "react";
import { playClick } from "~/lib/sound";

const CLICKABLE = "a, button, [role='button'], summary";

// One delegated listener plays the click sound for every link and button.
export default function ClickSounds() {
	useEffect(() => {
		const onPointerDown = (e: PointerEvent) => {
			if (e.button !== 0) return;
			const target = e.target as Element | null;
			if (target?.closest(CLICKABLE)) playClick();
		};
		document.addEventListener("pointerdown", onPointerDown);
		return () => document.removeEventListener("pointerdown", onPointerDown);
	}, []);

	return null;
}
