"use client";

import type { Profile } from "../../_data/profile";
import { Card } from "../molecules/Card";
import { Section } from "../molecules/Section";

export function ExperienceSection({ profile }: { profile: Profile }) {
  return (
    <Section id="experience" eyebrow="Карьерный путь" title="Опыт">
      <div className="space-y-5">
        {profile.experience.map((e) => (
          <Card key={`${e.period}-${e.company}`} className="p-5 sm:p-6 md:p-7">
            <div data-stagger className="flex items-start justify-between gap-6">
              <div data-stagger>
                <div className="text-[18px] font-semibold tracking-[-0.02em] text-foreground">
                  {e.company}
                </div>
                <div className="mt-1 text-[14px] text-(--muted)">{e.title}</div>
              </div>
              <div
                data-stagger
                className="text-right text-[12px] tracking-[0.14em] text-(--muted-2)"
              >
                {e.period}
              </div>
            </div>

            <ul
              data-stagger
              className="mt-5 space-y-2 text-[14px] leading-7 text-(--muted)"
            >
              {e.bullets.map((b) => (
                <li key={b} data-stagger className="flex gap-3">
                  <span className="mt-[9px] inline-block h-[6px] w-[6px] shrink-0 rounded-full bg-(--accent) opacity-70" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}

