import { cn } from "../../_utils/cn";

export function Section({
  id,
  eyebrow,
  title,
  children,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("py-16 scroll-mt-24", className)}
      data-reveal
    >
      <div className="mb-7" data-stagger>
        {eyebrow ? (
          <div className="mb-2 text-[12px] font-medium tracking-[0.18em] text-(--muted)">
            {eyebrow}
          </div>
        ) : null}
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-foreground">
          {title}
        </h2>
      </div>
      <div data-stagger>{children}</div>
    </section>
  );
}

