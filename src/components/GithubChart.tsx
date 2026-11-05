import ChartSounds from "./ChartSounds";
import { Section } from "./frame";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const USERNAME = "puang59";

const levelColors = [
	"bg-raised",
	"bg-[#2f2f2d]",
	"bg-[#575754]",
	"bg-[#94948f]",
	"bg-foreground",
];

const hash = (str: string) => {
	let h = 0;
	for (const c of str) h = (h * 31 + c.charCodeAt(0)) >>> 0;
	return h;
};

async function getContributions(): Promise<{
	total: number;
	days: Day[];
} | null> {
	try {
		const res = await fetch(
			`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
			{ next: { revalidate: 60 * 60 * 12 } },
		);
		if (!res.ok) return null;
		const data = await res.json();
		return { total: data.total.lastYear, days: data.contributions };
	} catch {
		return null;
	}
}

export default async function GithubChart() {
	const data = await getContributions();
	if (!data) return null;

	const first = new Date(`${data.days[0]?.date}T00:00:00Z`).getUTCDay();
	const pad: Day[] = Array.from({ length: first }, (_, k) => ({
		date: `pad-${k}`,
		count: -1,
		level: 0,
	}));
	const cells = [...pad, ...data.days];
	const weeks = { length: Math.ceil(cells.length / 7) };

	return (
		<Section index="01" title="Activity">
			<a
				href={`https://github.com/${USERNAME}`}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="GitHub contribution chart for the last year"
				className="block"
			>
				<ChartSounds>
					<div
						className="grid gap-[3px]"
						style={{
							gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
							gridTemplateRows: "repeat(7, auto)",
							gridAutoFlow: "column",
						}}
					>
						{cells.map((day, i) => {
							const pad = day.count < 0;
							const glow = !pad && day.level >= 1 && hash(day.date) % 5 === 0;
							return (
								<div
									key={day.date}
									data-row={pad ? undefined : i % 7}
									data-week={pad ? undefined : Math.floor(i / 7)}
									data-level={pad ? undefined : day.level}
									title={
										pad
											? undefined
											: `${day.count} contributions on ${day.date}`
									}
									className={`aspect-square transition-transform sm:rounded-[2px] duration-300 ease-soft hover:scale-[1.35] ${pad ? "" : levelColors[day.level]} ${glow ? "gh-cell-glow" : ""}`}
									style={
										glow
											? ({
													"--gh-dur": `${5 + (hash(`${day.date}d`) % 60) / 10}s`,
													"--gh-delay": `-${(hash(`${day.date}s`) % 110) / 10}s`,
												} as React.CSSProperties)
											: undefined
									}
								/>
							);
						})}
					</div>
				</ChartSounds>
			</a>
			<p className="mt-3 font-mono text-[11px] text-faint">
				{data.total.toLocaleString()} contributions in the last year
			</p>
		</Section>
	);
}
