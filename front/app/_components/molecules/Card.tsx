export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-reveal-card
      className={[
        "rounded-2xl border border-(--card-border) bg-(--card)",
        "shadow-[0_0_0_1px_rgba(145,255,0,0.06),0_24px_80px_rgba(0,0,0,0.55)]",
        "backdrop-blur-md",
        "transition-transform duration-500 will-change-transform",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

