"use client";

import CircularText from "../molecules/CircularText";

export function DecorCorner() {
  return (
    <div
      className="pointer-events-none fixed bottom-10 right-10 z-0 opacity-30"
      aria-hidden="true"
    >
      <CircularText
        text="REACT*NEXT*VUE*NUXT*TYPESCRIPT"
        spinDuration={22}
        size={230}
        className="pointer-events-none"
        letterClassName="text-(--accent) opacity-50"
      />
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[rgba(145,255,0,0.08)] blur-3xl" />
    </div>
  );
}
