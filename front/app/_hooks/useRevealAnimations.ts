"use client";

import { useEffect } from "react";

export function useRevealAnimations(root: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!root.current) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;

    const elRoot = root.current;

    // 1) Hero appear with stagger
    const heroEls = Array.from(elRoot.querySelectorAll<HTMLElement>("[data-hero]"));
    heroEls.forEach((el, i) => {
      el.dataset.visible = "true";
      el.animate(
        [
          { opacity: 0, transform: "translate3d(0,16px,0)", filter: "blur(10px)" },
          { opacity: 1, transform: "translate3d(0,0,0)", filter: "blur(0px)" },
        ],
        {
          duration: 850,
          delay: 80 + i * 70,
          easing: "cubic-bezier(0.2,0.8,0.2,1)",
          fill: "both",
        },
      );
    });

    const underline = elRoot.querySelector<HTMLElement>("[data-underline]");
    if (underline) underline.dataset.visible = "true";

    // 2) Sections + cards reveal on scroll (plus inner stagger)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          if (el.dataset.visible === "true") {
            observer.unobserve(el);
            continue;
          }

          el.dataset.visible = "true";

          const selector = el.hasAttribute("data-reveal-card")
            ? "[data-stagger]"
            : ":scope > [data-stagger]";

          const stagger = Array.from(el.querySelectorAll<HTMLElement>(selector));
          stagger.forEach((child, i) => {
            child.animate(
              [
                {
                  opacity: 0,
                  transform: "translate3d(0,14px,0)",
                  filter: "blur(10px)",
                },
                {
                  opacity: 1,
                  transform: "translate3d(0,0,0)",
                  filter: "blur(0px)",
                },
              ],
              {
                duration: 800,
                delay: i * 90,
                easing: "cubic-bezier(0.2,0.8,0.2,1)",
                fill: "both",
              },
            );
          });

          observer.unobserve(el);
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" },
    );

    const revealTargets =
      elRoot.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-card]");
    revealTargets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [root]);
}

