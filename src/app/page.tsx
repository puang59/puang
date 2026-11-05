import BlogPreview from "~/components/BlogPreview";
import Elsewhere from "~/components/Elsewhere";
import Experience from "~/components/Experience";
import Footer from "~/components/Footer";
import GithubChart from "~/components/GithubChart";
import Hero from "~/components/Hero";
import JsonLd from "~/components/JsonLd";
import ProjectPreview from "~/components/ProjectPreview";
import Skills from "~/components/Skills";
import { Frame } from "~/components/frame";
import { site } from "~/lib/site";

export default function HomePage() {
	return (
		<Frame>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@graph": [
						{
							"@type": "Person",
							"@id": `${site.url}/#person`,
							name: site.name,
							alternateName: "puang",
							url: site.url,
							image: `${site.url}/puang2.jpg`,
							email: `mailto:${site.email}`,
							jobTitle: "Full Stack Engineer",
							description: site.description,
							address: {
								"@type": "PostalAddress",
								addressLocality: "Chennai",
								addressCountry: "IN",
							},
							alumniOf: {
								"@type": "CollegeOrUniversity",
								name: "Vellore Institute of Technology, Chennai",
							},
							knowsAbout: [
								"Full stack development",
								"TypeScript",
								"React",
								"Next.js",
								"Rust",
								"Go",
								"AI agents",
							],
							sameAs: site.sameAs,
						},
						{
							"@type": "WebSite",
							"@id": `${site.url}/#website`,
							url: site.url,
							name: site.name,
							author: { "@id": `${site.url}/#person` },
						},
					],
				}}
			/>
			<Hero />
			<GithubChart />
			<Experience />
			<ProjectPreview />
			<Skills />
			<BlogPreview />
			<Elsewhere />
			<Footer />
		</Frame>
	);
}
