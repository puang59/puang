"use client";
import Link, { type LinkProps } from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { type ReactNode, useEffect, useState } from "react";

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

// Use a global variable to track visited routes
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

  // Only run client-side code after component mounts
  useEffect(() => {
    setIsClient(true);
    // Add current path to visitedRoutes on mount
    if (pathname) {
      visitedRoutes.add(pathname);
    }
  }, [pathname]);

  // Normalize paths for comparison
  const targetPath = href.split("?")[0] || ""; // Remove query params for comparison and provide default
  const currentPath = pathname || "";

  const handleTranstion = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    // If already on the same page, do nothing
    if (currentPath === targetPath) {
      return;
    }

    window.dispatchEvent(new CustomEvent("pageTransitionStart"));

    // Use longer sleep duration for first visit to a route
    const isFirstVisit = targetPath && !visitedRoutes.has(targetPath);
    const sleepDuration = isFirstVisit ? 1000 : 200;

    // Add to visited routes
    if (targetPath) {
      visitedRoutes.add(targetPath);
    }

    await sleep(sleepDuration);
    router.push(href);

    window.dispatchEvent(new CustomEvent("pageTransitionComplete"));
  };

  // Use a simpler render approach during SSR to avoid hydration mismatches
  return (
    <Link
      onClick={isClient ? handleTranstion : undefined}
      href={href}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
      prefetch={false}
    >
      {children}
    </Link>
  );
}
