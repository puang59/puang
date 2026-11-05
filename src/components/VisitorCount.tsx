"use client";
import { RiEyeLine } from "@remixicon/react";
import { m } from "framer-motion";
import { useEffect, useState } from "react";

// Counts are proxied through our own /api/visits route (CounterAPI), which
// keeps the API token on the server.
const SEEN_KEY = "visit-counted";

const format = (n: number) =>
	n >= 1000 ? `${(n / 1000).toFixed(2).replace(/\.?0+$/, "")}k` : String(n);

export default function VisitorCount() {
	const [count, setCount] = useState<number | null>(null);

	useEffect(() => {
		let seen = false;
		try {
			seen = sessionStorage.getItem(SEEN_KEY) === "1";
		} catch {}

		fetch(seen ? "/api/visits" : "/api/visits?hit=1")
			.then((r) => r.json())
			.then((res: { value?: number | null }) => {
				if (typeof res.value !== "number") return;
				setCount(res.value);
				// Only mark the session as counted once the hit actually landed.
				try {
					sessionStorage.setItem(SEEN_KEY, "1");
				} catch {}
			})
			.catch(() => {});
	}, []);

	return (
		<span
			className="flex h-4 items-center gap-1.5 text-faint text-xs tabular-nums"
			title={count === null ? undefined : `${count.toLocaleString()} visits`}
		>
			<RiEyeLine size={14} />
			{count === null ? (
				<span className="h-2 w-12 animate-pulse rounded-sm bg-raised" />
			) : (
				<m.span
					initial={{ opacity: 0, filter: "blur(4px)" }}
					animate={{ opacity: 1, filter: "blur(0px)" }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
				>
					{format(count)} visits
				</m.span>
			)}
		</span>
	);
}
