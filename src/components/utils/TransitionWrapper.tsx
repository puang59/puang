"use client";

import React, { type ReactNode, useEffect, useState } from "react";

interface TransitionWrapperProps {
  children: ReactNode;
}

export default function TransitionWrapper({
  children,
}: TransitionWrapperProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      setTimeout(() => {
        setIsInitialLoad(false);
      }, 100);
    }

    const handleRouteChangeStart = () => {
      setIsTransitioning(true);
    };

    const handleRouteChangeComplete = () => {
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    };

    window.addEventListener("pageTransitionStart", handleRouteChangeStart);
    window.addEventListener(
      "pageTransitionComplete",
      handleRouteChangeComplete
    );

    return () => {
      window.removeEventListener("pageTransitionStart", handleRouteChangeStart);
      window.removeEventListener(
        "pageTransitionComplete",
        handleRouteChangeComplete
      );
    };
  }, [isInitialLoad]);

  return (
    <div
      className={`transition-wrapper ${isTransitioning ? "page-transition" : ""
        } ${isInitialLoad ? "initial-load" : ""}`}
    >
      {children}
    </div>
  );
}
