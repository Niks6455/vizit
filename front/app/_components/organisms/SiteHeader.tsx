"use client";

import { useMemo } from "react";
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

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(255,255,255,0.08)] bg-[rgba(5,5,5,0.72)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-10 py-4">
        <a href="#" className="group inline-flex items-baseline gap-2">
          <span className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
            {profile.name}
          </span>
          <span className="text-[12px] tracking-[0.16em] text-(--muted-2)">
            {profile.title.toUpperCase()}
          </span>
          <span
            className="ml-2 inline-block h-[6px] w-[6px] rounded-full bg-(--accent) opacity-80"
            aria-hidden="true"
          />
        </a>

        <nav className="flex items-center gap-5 text-[13px] text-(--muted)">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

