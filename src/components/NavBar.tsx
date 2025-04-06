"use client";
import TransitionLink from "./utils/TransitionLink";
import {
  RiHome2Line,
  RiHome2Fill,
  RiPuzzle2Line,
  RiPuzzle2Fill,
  RiGitRepositoryLine,
  RiGitRepositoryFill,
} from "@remixicon/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NavBar = () => {
  const pathname = usePathname();
  const iconStyles = "transition-opacity duration-300 absolute";
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  return (
    <>
      {/* Enhanced bottom screen gradient for content fading */}
      <div className="fixed bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-40"></div>

      {/* Navbar positioned on top of the fade effect */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 pb-6">
        <div className="relative mx-auto px-4 bg-zinc-900 rounded-full w-fit">
          <div className="flex justify-center space-x-3 p-3">
            <TransitionLink
              href="/"
              className="group relative w-8 h-8 flex items-center justify-center"
              onMouseEnter={() => setHoveredIcon("home")}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              {/* Circular background that appears on hover */}
              <div
                className={`absolute inset-0 rounded-full bg-zinc-800 transition-opacity duration-200 ${
                  hoveredIcon === "home" ? "opacity-100" : "opacity-0"
                }`}
              ></div>

              <div className="relative w-5 h-5 flex items-center justify-center">
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

            <div className="inline-block max-h-full w-0.5 self-stretch bg-neutral-100 dark:bg-white/10"></div>

            <TransitionLink
              href="/projects"
              className="group relative w-8 h-8 flex items-center justify-center"
              onMouseEnter={() => setHoveredIcon("projects")}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              {/* Circular background that appears on hover */}
              <div
                className={`absolute inset-0 rounded-full bg-zinc-800 transition-opacity duration-200 ${
                  hoveredIcon === "projects" ? "opacity-100" : "opacity-0"
                }`}
              ></div>

              <div className="relative w-5 h-5 flex items-center justify-center">
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

            <div className="inline-block max-h-full w-0.5 self-stretch bg-neutral-100 dark:bg-white/10"></div>

            <TransitionLink
              href="/blog"
              className="group relative w-8 h-8 flex items-center justify-center"
              onMouseEnter={() => setHoveredIcon("blog")}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              {/* Circular background that appears on hover */}
              <div
                className={`absolute inset-0 rounded-full bg-zinc-800 transition-opacity duration-200 ${
                  hoveredIcon === "blog" ? "opacity-100" : "opacity-0"
                }`}
              ></div>

              <div className="relative w-5 h-5 flex items-center justify-center">
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
        </div>
      </nav>
    </>
  );
};

export default NavBar;
