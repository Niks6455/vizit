"use client";

import type { Profile } from "../../_data/profile";
import { formatLink } from "../../_utils/formatLink";
import { Chip } from "../atoms/Chip";
import { Card } from "../molecules/Card";
import { Section } from "../molecules/Section";

export function AboutSection({ profile }: { profile: Profile }) {
  return (
    <Section id="about" eyebrow="Коротко" title="Обо мне">
      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-7 p-7">
          <p data-stagger className="text-[15px] leading-8 text-(--muted)">
            Разрабатываю интерфейсы для сложных web-систем с упором на
            производительность, масштабируемость и чистую архитектуру. Имею опыт
            работы с data-heavy интерфейсами: таблицы, формы, фильтрация, роли и
            авторизация, real-time обновления. Предпочитаю осмысленные
            архитектурные решения, стабильный UI и прозрачную логику
            взаимодействия с backend-сервисами.
          </p>
          <div data-stagger className="mt-6 flex flex-wrap gap-2">
            <Chip tone="accent">Complex Web Interfaces</Chip>
            <Chip>REST · WebSocket</Chip>
            <Chip>Clear Architecture</Chip>
            <Chip>Data-Heavy Interfaces</Chip>
            <Chip>Backend Integration</Chip>
          </div>
        </Card>

        <Card className="col-span-5 p-7">
          <div
            data-stagger
            className="text-[12px] tracking-[0.18em] text-(--muted-2)"
          >
            КОНТАКТЫ
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
