import { ImageResponse } from "next/og";

// Open Graph cards drawn in the site's own style: off-black page, hatched
// side rails, a squiggle divider and off-white type.

const BG = "#0a0a0a";
const FG = "#ededea";
const MUTED = "#9a9a96";
const FAINT = "#5f5f5c";
const LINE = "#1f1f1f";

async function loadGoogleFont(family: string, text: string) {
	const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
	const css = await (await fetch(url)).text();
	const resource = css.match(
		/src: url\((.+)\) format\('(opentype|truetype)'\)/,
	);
	if (!resource?.[1]) throw new Error("failed to load font data");
	const response = await fetch(resource[1]);
	if (!response.ok) throw new Error("failed to load font data");
	return response.arrayBuffer();
}

function Rail({ left }: { left: number }) {
	return (
		<div
			style={{
				position: "absolute",
				top: 0,
				bottom: 0,
				left,
				width: 24,
				borderLeft: `1px solid ${LINE}`,
				borderRight: `1px solid ${LINE}`,
				backgroundImage:
					"repeating-linear-gradient(45deg, transparent 0px, transparent 9px, rgba(237,237,234,0.1) 9px, rgba(237,237,234,0.1) 10px)",
			}}
		/>
	);
}

// A row of soft waves, matching the dividers on the site.
function Squiggle({ width }: { width: number }) {
	const waves = Math.floor(width / 24);
	let d = "M0 6";
	for (let i = 0; i < waves; i++) {
		const x = i * 24;
		d += ` Q${x + 6} 0 ${x + 12} 6 T${x + 24} 6`;
	}
	return (
		<svg width={waves * 24} height={12} viewBox={`0 0 ${waves * 24} 12`}>
			<path d={d} fill="none" stroke="#3a3a37" strokeWidth={1.4} />
		</svg>
	);
}

export async function renderOgImage({
	title,
	subtitle,
	kicker,
	avatar,
}: {
	title: string;
	subtitle?: string;
	kicker?: string;
	avatar: string;
}) {
	const footer = "Karan Kumar · Full stack engineer";
	const mono = `puang.in${kicker ?? ""}`;
	const [sans, sansBold, monoFont] = await Promise.all([
		loadGoogleFont("Geist", `${subtitle ?? ""}${footer}`),
		loadGoogleFont("Geist:wght@600", title),
		loadGoogleFont("Geist+Mono", mono),
	]);

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				position: "relative",
				backgroundColor: BG,
				fontFamily: "Geist",
			}}
		>
			<Rail left={136} />
			<Rail left={1040} />

			<div
				style={{
					position: "absolute",
					top: 0,
					bottom: 0,
					left: 160,
					width: 880,
					display: "flex",
					flexDirection: "column",
					padding: "64px 56px",
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						fontFamily: "Geist Mono",
						fontSize: 20,
						color: FAINT,
					}}
				>
					<span>puang.in</span>
					{kicker && <span>{kicker}</span>}
				</div>

				<div style={{ display: "flex", marginTop: 36 }}>
					<Squiggle width={768} />
				</div>

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						marginTop: 56,
						flexGrow: 1,
					}}
				>
					<div
						style={{
							fontSize: title.length > 40 ? 56 : 72,
							fontWeight: 600,
							color: FG,
							letterSpacing: "-0.03em",
							lineHeight: 1.1,
						}}
					>
						{title}
					</div>
					{subtitle && (
						<div
							style={{
								marginTop: 24,
								fontSize: 28,
								color: MUTED,
								lineHeight: 1.45,
							}}
						>
							{subtitle.length > 140 ? `${subtitle.slice(0, 137)}…` : subtitle}
						</div>
					)}
				</div>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 16,
						paddingTop: 28,
						borderTop: `1px solid ${LINE}`,
					}}
				>
					<img
						src={avatar}
						alt=""
						width={48}
						height={48}
						style={{ borderRadius: 999, border: `1px solid ${LINE}` }}
					/>
					<span style={{ fontSize: 24, color: MUTED }}>{footer}</span>
				</div>
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
			fonts: [
				{ name: "Geist", data: sans, weight: 400, style: "normal" },
				{ name: "Geist", data: sansBold, weight: 600, style: "normal" },
				{ name: "Geist Mono", data: monoFont, weight: 400, style: "normal" },
			],
		},
	);
}
