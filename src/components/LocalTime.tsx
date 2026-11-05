"use client";
import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
	hour: "numeric",
	minute: "2-digit",
	timeZone: "Asia/Kolkata",
});

export default function LocalTime() {
	const [time, setTime] = useState<string | null>(null);

	useEffect(() => {
		const tick = () => setTime(formatter.format(new Date()).toLowerCase());
		tick();
		const id = setInterval(tick, 15_000);
		return () => clearInterval(id);
	}, []);

	return (
		<span className="font-mono text-[11px] text-faint tabular-nums">
			chennai · {time ?? "--:--"}
		</span>
	);
}
