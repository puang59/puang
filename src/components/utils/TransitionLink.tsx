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
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (currentPath === targetPath) {
      return;
    }

    window.dispatchEvent(new CustomEvent("pageTransitionStart"));

    const isFirstVisit = targetPath && !visitedRoutes.has(targetPath);

    if (targetPath) {
      visitedRoutes.add(targetPath);
    }

    await sleep(isFirstVisit ? 500 : 150);
    router.push(href);
    await sleep(isFirstVisit ? 500 : 150);

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
      prefetch={false}
    >
      {children}
    </Link>
  );
}
