"use client";

import { useEffect, useState } from "react";

const getInitialValue = (breakpoint: number) => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
};

export const useIsMobile = (breakpoint = 640) => {
  const [isMobile, setIsMobile] = useState(() => getInitialValue(breakpoint));

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
};

