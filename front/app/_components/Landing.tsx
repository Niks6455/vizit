"use client";

import { profile } from "../_data/profile";
import { useRef } from "react";
import { useRevealAnimations } from "../_hooks/useRevealAnimations";
import { Hr } from "./atoms/Hr";
import { DecorCorner } from "./organisms/DecorCorner";
import { SiteHeader } from "./organisms/SiteHeader";
import { Hero } from "./organisms/Hero";
import { AboutSection } from "./organisms/AboutSection";
import { StackSection } from "./organisms/StackSection";
import { ExperienceSection } from "./organisms/ExperienceSection";
import { ProjectsSection } from "./organisms/ProjectsSection";
import { AchievementsSection } from "./organisms/AchievementsSection";
import { ContactsSection } from "./organisms/ContactsSection";
import { SiteFooter } from "./organisms/SiteFooter";

export function Landing() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  useRevealAnimations(rootRef);

  return (
    <div ref={rootRef} className="min-h-screen">
      <DecorCorner />
      <SiteHeader profile={profile} />

      <main className="relative z-10 mx-auto w-full max-w-5xl px-10 pb-24 pt-16">
        <Hero profile={profile} />

        <div className="py-12">
          <Hr />
        </div>
        <AboutSection profile={profile} />

        <div className="py-12">
          <Hr />
        </div>
        <StackSection profile={profile} />

        <div className="py-12">
          <Hr />
        </div>
        <ExperienceSection profile={profile} />

        <div className="py-12">
          <Hr />
        </div>
        <ProjectsSection profile={profile} />

        <div className="py-12">
          <Hr />
        </div>
        <AchievementsSection profile={profile} />

        <div className="py-12">
          <Hr />
        </div>
        <ContactsSection profile={profile} />

        <SiteFooter profile={profile} />
      </main>
    </div>
  );
}
