"use client";
import { m } from "framer-motion";
import { usePathname } from "next/navigation";

// Types the missing path out like a shell command, then prints the error.
export default function MissingPath() {
	const path = usePathname() ?? "/";
	const command = `cd ${path}`;

	return (
		<div className="rounded-lg border border-line bg-surface px-4 py-3 font-mono text-[12px] leading-6">
			<p className="flex text-muted">
				<span className="mr-2 text-faint">$</span>
				<span className="truncate">
					{command.split("").map((char, i) => (
						<m.span
							// biome-ignore lint/suspicious/noArrayIndexKey: characters of a fixed string
							key={i}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 + i * 0.035, duration: 0.01 }}
						>
							{char}
						</m.span>
					))}
				</span>
				<m.span
					aria-hidden="true"
					className="ml-0.5 inline-block w-[7px] bg-muted"
					animate={{ opacity: [1, 0, 1] }}
					transition={{ duration: 1.1, repeat: Number.POSITIVE_INFINITY }}
				/>
			</p>
			<m.p
				className="text-faint"
				initial={{ opacity: 0, y: 2 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.7 + command.length * 0.035, duration: 0.4 }}
			>
				no such file or directory
			</m.p>
		</div>
	);
}
