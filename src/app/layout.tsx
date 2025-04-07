import "~/styles/globals.css";
import NavBar from "~/components/NavBar";
import TransitionWrapper from "~/components/utils/TransitionWrapper";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PostHogProvider } from "~/components/PostHogProvider";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground font-mono`}
      >
        <PostHogProvider>
          <div className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none z-40"></div>
          <div className="content-fade-mask">
            <TransitionWrapper>{children}</TransitionWrapper>
          </div>
          <NavBar />
          <div className="fixed bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-40"></div>
        </PostHogProvider>
      </body>
    </html>
  );
}
