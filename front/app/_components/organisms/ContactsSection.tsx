"use client";

import type { Profile } from "../../_data/profile";
import { formatLink } from "../../_utils/formatLink";
import { LinkButton } from "../atoms/LinkButton";
import { Card } from "../molecules/Card";
import { Section } from "../molecules/Section";

export function ContactsSection({ profile }: { profile: Profile }) {
  return (
    <Section id="contacts" eyebrow="Давайте делать продукты" title="Контакты">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
        <Card className="p-5 sm:p-6 md:col-span-7 md:p-7">
          <div data-stagger className="text-[15px] leading-8 text-(--muted)">
            Открыт к новым проектам и предложениям. Удобнее всего общаться в
            Telegram или по почте. При необходимости с радостью созвонюсь и
            обсужу детали.
          </div>
          <div data-stagger className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LinkButton href="mailto:7929189niks64@gmail.com">
              Написать на почту
            </LinkButton>
            <LinkButton href="https://t.me/NiksKap" variant="ghost">
              Написать в Telegram
            </LinkButton>
          </div>
        </Card>

        <Card className="p-5 sm:p-6 md:col-span-5 md:p-7">
          <div
            data-stagger
            className="text-[12px] tracking-[0.18em] text-(--muted-2)"
          >
            ССЫЛКИ
          </div>
          <div className="mt-4 space-y-3">
            {profile.contacts.map((c) => (
              <a
                key={c.href}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  c.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                data-stagger
                className="flex items-center justify-between rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-4 py-3 text-[14px] text-foreground transition-colors hover:bg-[rgba(255,255,255,0.05)]"
              >
                <span className="text-(--muted)">{c.label}</span>
                <span className="font-medium">{formatLink(c.href)}</span>
              </a>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}
