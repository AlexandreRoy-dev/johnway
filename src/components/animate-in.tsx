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

    const inView = () => {
      const rect = node.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.88 && rect.bottom > 64;
    };

    const reveal = () => {
      node.classList.add("is-in");
      node.classList.remove("will-animate");
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || inView()) {
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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={cn("anim-in", className)}>
      {children}
    </div>
  );
}
