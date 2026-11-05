/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/app/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-geist-sans)"],
				mono: ["var(--font-geist-mono)"],
			},
			colors: {
				background: "#0a0a0a",
				foreground: "#ededea",
				surface: "#121212",
				raised: "#181818",
				line: "#1f1f1f",
				edge: "#2a2a2a",
				muted: "#9a9a96",
				faint: "#5f5f5c",
			},
			transitionTimingFunction: {
				soft: "cubic-bezier(0.22, 1, 0.36, 1)",
			},
		},
	},
	plugins: [],
};
