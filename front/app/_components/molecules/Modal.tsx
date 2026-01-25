"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [rendered, setRendered] = useState(open);
  const [state, setState] = useState<"enter" | "exit">(open ? "enter" : "exit");

  useEffect(() => {
    if (open) {
      setRendered(true);
      setState("enter");
      return;
    }

    if (!rendered) return;

    setState("exit");
    const t = window.setTimeout(() => setRendered(false), 230);
    return () => window.clearTimeout(t);
  }, [open, rendered]);

  useEffect(() => {
    if (!rendered) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    // Focus the panel for better keyboard UX
    if (open) queueMicrotask(() => panelRef.current?.focus());

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, rendered]);

  if (!rendered) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-4 sm:p-8 md:p-10"
      style={{ zIndex: 100 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={(e) => {
        if (!open) return;
        if (!panelRef.current) return;
        if (!panelRef.current.contains(e.target as Node)) onClose();
      }}
    >
      <div
        className="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"
        data-state={state}
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className={[
          "modal-panel",
          "relative w-full max-w-4xl",
          "rounded-3xl border border-(--card-border) bg-[rgba(5,5,5,0.78)]",
          "shadow-[0_0_0_1px_rgba(145,255,0,0.08),0_30px_120px_rgba(0,0,0,0.75)]",
          "backdrop-blur-xl outline-none",
        ].join(" ")}
        data-state={state}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[rgba(255,255,255,0.08)] px-5 py-4 sm:gap-6 sm:px-8 sm:py-6">
          <div>
            <div
              id={titleId}
              className="text-[22px] font-semibold tracking-[-0.03em] text-foreground"
            >
              {title}
            </div>
            <div className="mt-1 text-[13px] tracking-[0.14em] text-(--muted-2)">
              PROJECT DETAILS
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 text-[13px] font-medium text-foreground transition-colors hover:bg-[rgba(255,255,255,0.08)]"
          >
            Закрыть <span className="ml-2 text-(--accent)">×</span>
          </button>
        </div>

        <div className="max-h-[78vh] overflow-auto px-5 py-5 sm:px-8 sm:py-7">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
