export default function Footer() {
	return (
		<footer className="mt-auto flex items-center justify-between gap-4 border-line border-t px-5 pt-6 pb-10 font-mono text-[11px] text-faint sm:px-8">
			<span>© {new Date().getFullYear()} karan kumar</span>
			<a
				href="mailto:hello@puang.in"
				className="transition-colors duration-300 hover:text-foreground"
			>
				open to roles
			</a>
		</footer>
	);
}
