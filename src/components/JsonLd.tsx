// Renders schema.org structured data for search engines.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON we control
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
}
