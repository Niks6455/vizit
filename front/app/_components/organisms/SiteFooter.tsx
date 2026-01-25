"use client";

import type { Profile } from "../../_data/profile";

export function SiteFooter({ profile }: { profile: Profile }) {
  return (
    <footer className="pt-8 text-center text-[12px] text-(--muted-2)">
      <span className="text-foreground">{profile.name}</span>{" "}
      <span className="opacity-70">·</span>{" "}
      <span>{new Date().getFullYear()}</span>{" "}
    </footer>
  );
}
