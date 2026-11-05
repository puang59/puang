import "~/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClickSounds from "~/components/ClickSounds";
import MotionProvider from "~/components/MotionProvider";
import { PostHogProvider } from "~/components/PostHogProvider";
import TransitionWrapper from "~/components/utils/TransitionWrapper";
import { ogImage, site } from "~/lib/site";

const geistSans = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: {
		default: site.title,
		template: `%s · ${site.name}`,
	},
	description: site.description,
	applicationName: site.name,
	authors: [{ name: site.name, url: site.url }],
	creator: site.name,
	keywords: [
		"Karan Kumar",
		"puang",
		"puang59",
		"full stack engineer",
		"software engineer",
		"web developer",
		"Next.js",
		"React",
		"TypeScript",
		"AI agents",
		"ploglabs",
		"devdoq",
		"turflang",
		"Chennai",
		"portfolio",
	],
	alternates: { canonical: "/" },
	openGraph: {
		title: site.title,
		description: site.description,
		url: site.url,
		siteName: site.name,
		locale: "en_US",
		type: "website",
		images: [{ url: ogImage({}), width: 1200, height: 630, alt: site.title }],
	},
	twitter: {
		card: "summary_large_image",
		title: site.title,
		description: site.description,
		creator: site.twitter,
		site: site.twitter,
		images: [ogImage({})],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	formatDetection: { email: false, telephone: false, address: false },
};

export const viewport: Viewport = {
	themeColor: "#0a0a0a",
	colorScheme: "dark",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} bg-background font-sans text-foreground antialiased`}
			>
				<PostHogProvider>
					<MotionProvider>
						<TransitionWrapper>{children}</TransitionWrapper>
					</MotionProvider>
					<ClickSounds />
				</PostHogProvider>
			</body>
		</html>
	);
}
