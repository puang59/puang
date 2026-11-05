import type { MetadataRoute } from "next";
import { site } from "~/lib/site";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: site.name,
		short_name: "puang",
		description: site.description,
		start_url: "/",
		display: "standalone",
		background_color: "#0a0a0a",
		theme_color: "#0a0a0a",
		icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
	};
}
