"use client";

import type { Profile } from "../../_data/profile";
import { Card } from "../molecules/Card";
import { LinkButton } from "../atoms/LinkButton";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <div className="relative">
      <div
        data-accent-glow
        className="pointer-events-none absolute -left-12 -top-10 h-56 w-56 rounded-full bg-[rgba(145,255,0,0.12)] blur-3xl"
        style={{ opacity: 0.6 }}
        aria-hidden="true"
      />

      <div className="mb-8 md:mb-10">
        <div
          data-hero
          className="mb-3 text-[12px] tracking-[0.18em] text-(--muted)"
        >
          {profile.location}
        </div>
        <h1
          data-hero
          className="text-[38px] font-semibold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-[44px] md:text-[52px]"
        >
          {profile.name}
        </h1>
        <div data-hero className="mt-3 flex flex-wrap items-center gap-3">
          <div className="text-[16px] text-(--muted)">{profile.title}</div>
          <span className="text-(--muted-2)">/</span>
          <div className="text-[16px] text-(--muted) sm:whitespace-nowrap">
            React · Next · Vue · Nuxt · TypeScript
          </div>
        </div>
        <div className="mt-6">
          <div
            data-underline
            className="h-[2px] w-[220px] bg-[linear-gradient(to_right,var(--accent),rgba(145,255,0,0.12),transparent)]"
          />
        </div>
      </div>

      <Card className="relative overflow-hidden p-5 sm:p-6 md:p-8">
        <div
          data-hero
          data-stagger
          className="max-w-3xl text-[16px] leading-8 text-(--muted)"
        >
          {profile.summary}
        </div>

        <div data-hero data-stagger className="mt-7 flex flex-wrap gap-3">
          <LinkButton href="#projects">Смотреть проекты</LinkButton>
          <LinkButton href="#contacts" variant="ghost">
            Связаться
          </LinkButton>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="/resume.pdf"
            className="inline-flex h-11 items-center justify-center rounded-full border border-[rgba(145,255,0,0.25)] bg-[rgba(145,255,0,0.08)] px-5 text-[14px] font-medium text-foreground transition-colors hover:bg-[rgba(145,255,0,0.12)]"
          >
            Резюме (PDF)
          </a>
          <div className="ml-auto flex items-center gap-2 text-[12px] text-(--muted-2) max-sm:hidden">
            <span className="inline-block h-[6px] w-[6px] rounded-full bg-(--accent) opacity-70" />
            open to work
          </div>
        </div>
      </Card>
    </div>
  );
}
