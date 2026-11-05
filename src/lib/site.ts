export const site = {
	url: "https://www.puang.in",
	name: "Karan Kumar",
	title: "Karan Kumar · Full stack engineer",
	description:
		"Karan Kumar (puang) is a full stack engineer and CS undergrad in Chennai building web apps, CLI tools and AI agent pipelines. Co-founder of ploglabs and core maintainer of turflang.",
	email: "hello@puang.in",
	twitter: "@notpuang",
	sameAs: [
		"https://github.com/puang59",
		"https://x.com/notpuang",
		"https://www.linkedin.com/in/karan-kumar-a54127151/",
		"https://weblog.puang.in",
	],
};

// Builds the URL of a generated Open Graph image for a page.
export function ogImage(params: {
	title?: string;
	subtitle?: string;
	kicker?: string;
}) {
	const search = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) {
		if (value) search.set(key, value);
	}
	const query = search.toString();
	return `/og/home${query ? `?${query}` : ""}`;
}
