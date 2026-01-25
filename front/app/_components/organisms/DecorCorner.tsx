"use client";

import CircularText from "../molecules/CircularText";

export function DecorCorner() {
  return (
    <div
      className="pointer-events-none fixed bottom-6 right-6 z-0 hidden opacity-25 sm:block md:bottom-10 md:right-10 md:opacity-30"
      aria-hidden="true"
    >
      <CircularText
        text="REACT*NEXT*VUE*NUXT*TYPESCRIPT"
        spinDuration={22}
        size={180}
        className="pointer-events-none"
        letterClassName="text-(--accent) opacity-50"
      />
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[rgba(145,255,0,0.08)] blur-3xl" />
    </div>
  );
}
