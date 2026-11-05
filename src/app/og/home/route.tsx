import { renderOgImage } from "~/lib/og";

export const runtime = "edge";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	return renderOgImage({
		title: searchParams.get("title") ?? "Hi, I'm Karan.",
		subtitle:
			searchParams.get("subtitle") ??
			(searchParams.get("title")
				? undefined
				: "I build web apps, CLI tools and AI agent pipelines."),
		kicker: searchParams.get("kicker") ?? undefined,
		avatar: new URL("/puang2.jpg", request.url).toString(),
	});
}
