"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export function AnimateIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    node.style.setProperty("--d", `${delay}s`);

    const reveal = () => {
      node.classList.add("is-in");
      node.classList.remove("will-animate");
    };

    const inView = () => {
      const rect = node.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      inView()
    ) {
      reveal();
      return;
    }

    node.classList.add("will-animate");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);

    const failsafe = window.setTimeout(reveal, 1800);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [delay]);

  return (
    <div ref={ref} className={cn("anim-in", className)}>
      {children}
    </div>
  );
}
