import { renderOgImage } from "~/lib/og";

export const runtime = "edge";

// Kept for existing links; renders the same card with a "writing" kicker.
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const date = searchParams.get("top");
	return renderOgImage({
		title: searchParams.get("title") ?? "Writing",
		subtitle: searchParams.get("subtitle") ?? undefined,
		kicker: date ? `writing · ${date.toLowerCase()}` : "writing",
		avatar: new URL("/puang2.jpg", request.url).toString(),
	});
}
