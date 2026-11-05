"use client";
import { RiVolumeMuteLine, RiVolumeUpLine } from "@remixicon/react";
import { useSyncExternalStore } from "react";
import { isMuted, playClick, setMuted, subscribe } from "~/lib/sound";

export default function SoundToggle() {
	const muted = useSyncExternalStore(subscribe, isMuted, () => false);
	const Icon = muted ? RiVolumeMuteLine : RiVolumeUpLine;

	return (
		<button
			type="button"
			onClick={() => {
				setMuted(!muted);
				// Confirm unmuting with a tick (the click listener ran while muted).
				if (muted) playClick();
			}}
			aria-label={muted ? "Unmute sounds" : "Mute sounds"}
			title={muted ? "Unmute sounds" : "Mute sounds"}
			className="flex h-6 w-6 items-center justify-center rounded-md text-faint transition-colors duration-300 hover:bg-surface hover:text-foreground"
		>
			<Icon size={14} />
		</button>
	);
}
