import "~/styles/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import NavBar from "~/components/NavBar";
import { PostHogProvider } from "~/components/PostHogProvider";
import TransitionWrapper from "~/components/utils/TransitionWrapper";

const geistSans = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://www.puang.in"),
	title: {
		default: "Karan Kumar",
		template: "%s | Karan Kumar",
	},
	description: "Programmer, filmmaker and uku player",
	openGraph: {
		title: "Karan Kumar",
		description: "Programmer, filmmaker and uku player",
		url: "https://www.puang.in",
		siteName: "Karan Kumar",
		locale: "en_US",
		type: "website",
		images: ["https://www.puang.in/og/home"],
	},
	robots: {
		index: true,
		follow: true,
		"max-video-preview": -1,
		"max-image-preview": "large",
		"max-snippet": -1,
	},
	twitter: {
		title: "Karan Kumar",
		card: "summary_large_image",
		creator: "@puangg59",
	},
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} bg-background font-mono text-foreground antialiased`}
			>
				<Script
					src="https://platform.twitter.com/widgets.js"
					strategy="afterInteractive"
				/>
				<PostHogProvider>
					<div className="content-fade-mask">
						<TransitionWrapper>{children}</TransitionWrapper>
					</div>
					<NavBar />
				</PostHogProvider>
			</body>
		</html>
	);
}
