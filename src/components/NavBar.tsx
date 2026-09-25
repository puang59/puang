"use client";
import {
	RiGitRepositoryFill,
	RiGitRepositoryLine,
	RiHome2Fill,
	RiHome2Line,
	RiPuzzle2Fill,
	RiPuzzle2Line,
} from "@remixicon/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import TransitionLink from "./utils/TransitionLink";

const NavBar = () => {
	const pathname = usePathname();
	const iconStyles = "transition-opacity duration-300 absolute";
	const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

	return (
		<nav className="-translate-x-1/2 sm:-translate-y-1/2 fixed bottom-6 left-1/2 z-50 sm:top-1/2 sm:right-4 sm:bottom-auto sm:left-auto sm:translate-x-0">
			<div className="flex w-fit flex-row items-center space-x-3 rounded-full bg-zinc-900 p-3 sm:flex-col sm:space-x-0 sm:space-y-3">
				<TransitionLink
					href="/"
					className="group relative flex h-8 w-8 items-center justify-center"
					onMouseEnter={() => setHoveredIcon("home")}
					onMouseLeave={() => setHoveredIcon(null)}
				>
					<div
						className={`absolute inset-0 rounded-full bg-zinc-800 transition-opacity duration-200 ${
							hoveredIcon === "home" ? "opacity-100" : "opacity-0"
						}`}
					/>

					<div className="relative flex h-5 w-5 items-center justify-center">
						<RiHome2Fill
							size={20}
							className={`${iconStyles} ${
								pathname === "/" ? "opacity-100" : "opacity-0"
							}`}
						/>
						<RiHome2Line
							size={20}
							className={`${iconStyles} ${
								pathname === "/" ? "opacity-0" : "opacity-100"
							}`}
						/>
					</div>
				</TransitionLink>

				<div className="w-0.5 self-stretch bg-white/10 sm:h-0.5 sm:w-full" />

				<TransitionLink
					href="/projects"
					className="group relative flex h-8 w-8 items-center justify-center"
					onMouseEnter={() => setHoveredIcon("projects")}
					onMouseLeave={() => setHoveredIcon(null)}
				>
					<div
						className={`absolute inset-0 rounded-full bg-zinc-800 transition-opacity duration-200 ${
							hoveredIcon === "projects" ? "opacity-100" : "opacity-0"
						}`}
					/>

					<div className="relative flex h-5 w-5 items-center justify-center">
						<RiPuzzle2Fill
							size={20}
							className={`${iconStyles} ${
								pathname === "/projects" ? "opacity-100" : "opacity-0"
							}`}
						/>
						<RiPuzzle2Line
							size={20}
							className={`${iconStyles} ${
								pathname === "/projects" ? "opacity-0" : "opacity-100"
							}`}
						/>
					</div>
				</TransitionLink>

				<div className="w-0.5 self-stretch bg-white/10 sm:h-0.5 sm:w-full" />

				<TransitionLink
					href="/blog"
					className="group relative flex h-8 w-8 items-center justify-center"
					onMouseEnter={() => setHoveredIcon("blog")}
					onMouseLeave={() => setHoveredIcon(null)}
				>
					<div
						className={`absolute inset-0 rounded-full bg-zinc-800 transition-opacity duration-200 ${
							hoveredIcon === "blog" ? "opacity-100" : "opacity-0"
						}`}
					/>

					<div className="relative flex h-5 w-5 items-center justify-center">
						<RiGitRepositoryFill
							size={20}
							className={`${iconStyles} ${
								pathname === "/blog" ? "opacity-100" : "opacity-0"
							}`}
						/>
						<RiGitRepositoryLine
							size={20}
							className={`${iconStyles} ${
								pathname === "/blog" ? "opacity-0" : "opacity-100"
							}`}
						/>
					</div>
				</TransitionLink>
			</div>
		</nav>
	);
};

export default NavBar;
