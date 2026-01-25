import { cn } from "../../_utils/cn";

export function LinkButton({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-[14px] font-medium transition-colors";

  const styles =
    variant === "primary"
      ? "bg-[var(--foreground)] text-[var(--background)] hover:bg-[rgba(242,242,242,0.86)]"
      : "border border-[var(--card-border)] bg-[rgba(255,255,255,0.02)] text-[var(--foreground)] hover:bg-[rgba(255,255,255,0.06)]";

  return (
    <a
      href={href}
      className={cn(base, styles, className)}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
      <span
        aria-hidden="true"
        className="text-(--accent)"
        style={{ transform: "translateY(-0.5px)" }}
      >
        ↗
      </span>
    </a>
  );
}

