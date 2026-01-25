"use client";

import type { Profile } from "../../_data/profile";
import { Chip } from "../atoms/Chip";
import { Card } from "../molecules/Card";
import { Section } from "../molecules/Section";

export function StackSection({ profile }: { profile: Profile }) {
  return (
    <Section id="stack" eyebrow="Инструменты" title="Технологии">
      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-6 p-7">
          <div
            data-stagger
            className="text-[12px] tracking-[0.18em] text-(--muted-2)"
          >
            ОСНОВНОЕ
          </div>
          <div data-stagger className="mt-4 flex flex-wrap gap-2">
            {profile.stack.primary.map((s) => (
              <Chip key={s} tone="accent">
                {s}
              </Chip>
            ))}
          </div>
        </Card>

        <Card className="col-span-6 p-7">
          <div
            data-stagger
            className="text-[12px] tracking-[0.18em] text-(--muted-2)"
          >
            СМЕЖНЫЕ ТЕХНОЛОГИИ
          </div>
          <div data-stagger className="mt-4 flex flex-wrap gap-2">
            {profile.stack.also.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}
