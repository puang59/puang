"use client";
import Link, { type LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { type ReactNode, useEffect, useState } from "react";

interface TransitionLinkProps extends LinkProps {
	children: ReactNode;
	href: string;
	className: string;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const visitedRoutes = new Set<string>();

export default function TransitionLink({
	children,
	href,
	className,
	onMouseEnter,
	onMouseLeave,
	...props
}: TransitionLinkProps) {
	const router = useRouter();
	const pathname = usePathname();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
		if (pathname) {
			visitedRoutes.add(pathname);
		}
	}, [pathname]);

	const targetPath = href.split("?")[0] || "";
	const currentPath = pathname || "";

	const handleTranstion = async (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
	) => {
		// Let the browser handle new-tab / new-window clicks normally.
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
			return;
		}

		e.preventDefault();

		if (currentPath === targetPath) {
			return;
		}

		// starting animation here
		window.dispatchEvent(new CustomEvent("pageTransitionStart"));

		await sleep(160);

		router.push(href);

		if (targetPath) {
			visitedRoutes.add(targetPath);
		}

		await sleep(60);

		window.dispatchEvent(new CustomEvent("pageTransitionComplete"));
	};

	return (
		<Link
			onClick={isClient ? handleTranstion : undefined}
			href={href}
			className={className}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			{...props}
			prefetch={true}
		>
			{children}
		</Link>
	);
}
