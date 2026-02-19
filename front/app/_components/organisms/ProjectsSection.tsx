"use client";

import { useMemo, useState } from "react";
import type { Profile } from "../../_data/profile";
import { Chip } from "../atoms/Chip";
import { ProjectModal } from "../molecules/ProjectModal";
import { Section } from "../molecules/Section";
import ScrollStack, { ScrollStackItem } from "../molecules/ScrollStack";
import { useMediaQuery } from "../../_hooks/useMediaQuery";
import { reachGoal } from "../../_lib/mailRuPixel";

export function ProjectsSection({ profile }: { profile: Profile }) {
  const [open, setOpen] = useState(false);
  const [activeName, setActiveName] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const activeProject = useMemo(
    () => profile.projects.find((p) => p.name === activeName) ?? null,
    [activeName, profile.projects],
  );

  return (
    <Section id="projects" eyebrow="Подборка" title="Проекты">
      <div data-stagger className="relative">
        {isMobile ? (
          <div className="space-y-4">
            {profile.projects.map((p) => (
              <div
                key={p.name}
                className={[
                  "rounded-3xl border border-[rgba(255,255,255,0.14)] bg-[#0b0b0b]",
                  "shadow-[0_0_0_1px_rgba(145,255,0,0.06),0_24px_80px_rgba(0,0,0,0.55)]",
                  "p-5",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[12px] tracking-[0.18em] text-(--muted-2)">
                      PROJECT
                    </div>
                    <div className="mt-2 text-[20px] font-semibold tracking-[-0.03em] text-foreground">
                      {p.name}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      reachGoal("Prosmotr");
                      setActiveName(p.name);
                      setOpen(true);
                    }}
                    className="inline-flex h-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 text-[13px] font-medium text-foreground transition-colors hover:bg-[rgba(255,255,255,0.08)]"
                  >
                    Подробнее <span className="ml-2 text-(--accent)">＋</span>
                  </button>
                </div>

                <p className="mt-4 text-[14px] leading-7 text-(--muted)">
                  {p.description}
                </p>

                {p.links?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.links.slice(0, 2).map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] px-3 py-1 text-[13px] leading-6 text-(--muted) transition-colors hover:bg-[rgba(255,255,255,0.06)]"
                      >
                        {l.label}
                        <img src="/icons/arrow.svg" alt="arrow-right" className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
        <ScrollStack
          useWindowScroll
          innerClassName="pt-[10vh] px-0 pb-[45vh]"
          stackPosition="26%"
          scaleEndPosition="12%"
          itemStackDistance={34}
          itemDistance={20}
          baseScale={0.88}
          itemScale={0.032}
          rotationAmount={0.25}
          blurAmount={0.6}
        >
          {profile.projects.map((p) => (
            <ScrollStackItem
              key={p.name}
              itemClassName={[
                "h-auto min-h-[260px] my-6",
                "p-6 md:p-10 rounded-3xl",
                "border border-[rgba(255,255,255,0.14)] bg-[#0b0b0b]",
                "shadow-[0_0_0_1px_rgba(145,255,0,0.06),0_24px_80px_rgba(0,0,0,0.55)]",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-[12px] tracking-[0.18em] text-(--muted-2)">
                    PROJECT
                  </div>
                  <div className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-foreground">
                    {p.name}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      reachGoal("Prosmotr");
                      setActiveName(p.name);
                      setOpen(true);
                    }}
                    className="inline-flex h-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 text-[13px] font-medium text-foreground transition-colors hover:bg-[rgba(255,255,255,0.08)]"
                  >
                    Подробнее <span className="ml-2 text-(--accent)">＋</span>
                  </button>

                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 h-10 items-center justify-center rounded-full border border-[rgba(145,255,0,0.22)] bg-[rgba(145,255,0,0.06)] px-4 text-[13px] font-medium text-foreground transition-colors hover:bg-[rgba(145,255,0,0.12)]"
                    >
                      Открыть
                        <img src="/icons/arrow.svg" alt="arrow-right" className="w-5 h-5" />
                    </a>
                  ) : null}
                </div>
              </div>

              <p className="mt-6 max-w-3xl text-[15px] leading-8 text-(--muted)">
                {p.description}
              </p>

              {p.links?.length ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.links.slice(0, 2).map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] px-3 py-1 text-[13px] leading-6 text-(--muted) transition-colors hover:bg-[rgba(255,255,255,0.06)]"
                    >
                      {l.label}
                      <img src="/icons/arrow.svg" alt="arrow-right" className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              ) : null}

              <div className="mt-8 h-px w-full bg-[linear-gradient(to_right,rgba(145,255,0,0.18),rgba(255,255,255,0.08),transparent)]" />
            </ScrollStackItem>
          ))}
        </ScrollStack>
        )}
      </div>

      <ProjectModal
        open={open}
        project={activeProject}
        onClose={() => setOpen(false)}
      />
    </Section>
  );
}
