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
    // Handle initial page load animation
    if (isInitialLoad) {
      // Use setTimeout to ensure the animation runs after component mount
      setTimeout(() => {
        setIsInitialLoad(false);
      }, 100);
    }

    const handleRouteChangeStart = () => {
      console.log("Transition started"); // For debugging
      setIsTransitioning(true);
    };

    const handleRouteChangeComplete = () => {
      console.log("Transition completed");
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
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
      className={`transition-wrapper ${
        isTransitioning ? "page-transtion" : ""
      } ${isInitialLoad ? "initial-load" : ""}`}
    >
      {children}
    </div>
  );
}
