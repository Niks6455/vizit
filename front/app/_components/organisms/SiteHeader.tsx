"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Profile } from "../../_data/profile";

export function SiteHeader({ profile }: { profile: Profile }) {
  const nav = useMemo(
    () => [
      { label: "Обо мне", href: "#about" },
      { label: "Стек", href: "#stack" },
      { label: "Опыт", href: "#experience" },
      { label: "Проекты", href: "#projects" },
      { label: "Достижения", href: "#achievements" },
      { label: "Контакты", href: "#contacts" },
    ],
    [],
  );

  // No highlight at page top (hero).
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const ratiosRef = useRef<Record<string, number>>({});
  const sheetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const targets = nav
      .map((n) => document.getElementById(n.href.replace("#", "")))
      .filter(Boolean) as HTMLElement[];

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          ratiosRef.current[id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        }

        // Pick the "most visible" section to avoid flicker.
        let bestId: string | null = null;
        let best = 0;
        for (const el of targets) {
          const r = ratiosRef.current[el.id] ?? 0;
          if (r >= best) {
            best = r;
            bestId = el.id;
          }
        }
        // If nothing is visible (e.g. at hero/top), don't highlight anything.
        if (!bestId || best <= 0) {
          setActiveHref(null);
          return;
        }
        setActiveHref(`#${bestId}`);
      },
      {
        // "active" around the middle of viewport
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.75, 1],
      },
    );

    targets.forEach((el) => observer.observe(el));

    // If user prefers reduced motion, don't fight manual selection
    if (reduce) setActiveHref(null);

    return () => observer.disconnect();
  }, [nav]);

  useEffect(() => {
    if (!menuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(255,255,255,0.08)] bg-[rgba(5,5,5,0.72)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 sm:px-6 md:px-10 md:py-4">
        <a href="#" className="group inline-flex items-baseline gap-2">
          <span className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
            {profile.name}
          </span>
          <span className="hidden text-[12px] tracking-[0.16em] text-(--muted-2) sm:inline">
            {profile.title.toUpperCase()}
          </span>
          <span
            className="ml-2 inline-block h-[6px] w-[6px] rounded-full bg-(--accent) opacity-80"
            aria-hidden="true"
          />
        </a>

        {/* Desktop / tablet nav */}
        <nav className="hidden items-center gap-5 text-[13px] text-(--muted) sm:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActiveHref(item.href)}
              className={[
                "relative transition-colors hover:text-foreground",
                item.href === activeHref ? "text-foreground" : "",
              ].join(" ")}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={[
                  "absolute -bottom-2 left-0 right-0 h-[2px] rounded-full bg-(--accent)",
                  "transition-opacity duration-200",
                  item.href === activeHref ? "opacity-100" : "opacity-0",
                ].join(" ")}
              />
            </a>
          ))}
        </nav>

        {/* Mobile burger */}
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 text-[13px] font-medium text-foreground transition-colors hover:bg-[rgba(255,255,255,0.08)] sm:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Открыть меню"
        >
          Меню <span className="ml-2 text-(--accent)">≡</span>
        </button>
      </div>

      {/* Mobile sheet */}
      {menuOpen ? (
        <div
          className="fixed inset-0 sm:hidden"
          style={{ zIndex: 90 }}
          onMouseDown={(e) => {
            if (!sheetRef.current) return;
            if (!sheetRef.current.contains(e.target as Node)) setMenuOpen(false);
          }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            ref={sheetRef}
            className="absolute left-3 right-3 top-3 rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[#050505] shadow-[0_0_0_1px_rgba(145,255,0,0.08),0_30px_120px_rgba(0,0,0,0.70)]"
          >
            <div className="flex items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.08)] px-5 py-4">
              <div className="text-[12px] tracking-[0.18em] text-(--muted-2)">
                NAVIGATION
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-9 items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 text-[13px] font-medium text-foreground transition-colors hover:bg-[rgba(255,255,255,0.08)]"
              >
                Закрыть <span className="ml-2 text-(--accent)">×</span>
              </button>
            </div>

            <div className="px-5 py-4">
              <div className="grid grid-cols-2 gap-2">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setActiveHref(item.href);
                      setMenuOpen(false);
                    }}
                    className={[
                      "relative rounded-2xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-[14px] font-medium text-foreground transition-colors hover:bg-[rgba(255,255,255,0.06)]",
                      item.href === activeHref
                        ? "border-[rgba(145,255,0,0.35)] bg-[rgba(145,255,0,0.10)]"
                        : "",
                    ].join(" ")}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={[
                        "absolute bottom-2 left-4 right-4 h-[2px] rounded-full bg-(--accent) transition-opacity duration-200",
                        item.href === activeHref ? "opacity-100" : "opacity-0",
                      ].join(" ")}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

