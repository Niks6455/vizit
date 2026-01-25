"use client";

import type { Profile } from "../../_data/profile";
import { Card } from "../molecules/Card";
import { Section } from "../molecules/Section";

export function AchievementsSection({ profile }: { profile: Profile }) {
  return (
    <Section id="achievements" eyebrow="Успехи" title="Достижения">
      <Card className="p-7">
        <ul
          data-stagger
          className="space-y-3 text-[14px] leading-7 text-(--muted)"
        >
          {profile.achievements.map((a) => (
            <li key={a} data-stagger className="flex gap-3">
              <span className="mt-[9px] inline-block h-[6px] w-[6px] shrink-0 rounded-full bg-(--accent) opacity-70" />
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  );
}
