"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function ImageLightbox({
  open,
  src,
  alt,
  onClose,
}: {
  open: boolean;
  src: string;
  alt: string;
  onClose: () => void;
}) {
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

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, rendered]);

  if (!rendered) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-10"
      style={{ zIndex: 110 }}
      onMouseDownCapture={(e) => {
        // Prevent portal event from closing the parent Modal
        e.stopPropagation();
      }}
      onMouseDown={(e) => {
        if (!open) return;
        if (!panelRef.current) return;
        if (!panelRef.current.contains(e.target as Node)) onClose();
      }}
      aria-hidden="true"
    >
      <div
        className="modal-backdrop absolute inset-0 bg-black/80 backdrop-blur-sm"
        data-state={state}
      />

      <div
        ref={panelRef}
        className={[
          "modal-panel relative w-full max-w-6xl",
          "rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[#050505]",
          "shadow-[0_0_0_1px_rgba(145,255,0,0.08),0_30px_120px_rgba(0,0,0,0.80)]",
          "overflow-hidden",
        ].join(" ")}
        data-state={state}
      >
        <div className="flex items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.08)] px-6 py-4">
          <div className="text-[13px] tracking-[0.12em] text-(--muted-2)">
            IMAGE PREVIEW
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 text-[13px] font-medium text-foreground transition-colors hover:bg-[rgba(255,255,255,0.08)]"
          >
            Закрыть <span className="ml-2 text-(--accent)">×</span>
          </button>
        </div>

        <div className="max-h-[82vh] overflow-auto p-6">
          <div className="rounded-2xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.02)] p-3">
            <Image
              src={src}
              alt={alt}
              width={1600}
              height={900}
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

