import { cn } from "../../_utils/cn";

export function Chip({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[13px] leading-6",
        tone === "accent"
          ? "border-[rgba(145,255,0,0.28)] bg-[rgba(145,255,0,0.10)] text-foreground"
          : "border-(--card-border) bg-[rgba(255,255,255,0.03)] text-(--muted)",
        className,
      )}
    >
      {children}
    </span>
  );
}

