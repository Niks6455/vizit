"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ProfileProject } from "../../_data/profile";
import { Chip } from "../atoms/Chip";
import { ImageLightbox } from "./ImageLightbox";
import { Modal } from "./Modal";

export function ProjectModal({
  project,
  open,
  onClose,
}: {
  project: ProfileProject | null;
  open: boolean;
  onClose: () => void;
}) {
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!open) setZoomSrc(null);
  }, [open, project?.name]);

  if (!project) return null;

  const images = project.images?.length
    ? project.images
    : ["/projects/placeholder-1.svg"];

  return (
    <Modal open={open} title={project.name} onClose={onClose}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="text-[14px] leading-8 text-(--muted)">
            {project.details ?? project.description}
          </div>

          <p className="mt-5 text-[14px] leading-8 text-(--muted)">
            Стек проекта:
          </p>
          {project.stack?.length ? (
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          ) : null}

          {project.links?.length ? (
            <div className="mt-7">
              <div className="text-[12px] tracking-[0.18em] text-(--muted-2)">
                LINKS
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-[14px] text-foreground transition-colors hover:bg-[rgba(255,255,255,0.06)]"
                  >
                    <span className="text-(--muted)">{l.label}</span>
                    <span className="font-medium">
                      {formatHost(l.href)}
                      <span className="ml-2 text-(--accent)">↗</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="md:col-span-5">
          <div className="text-[12px] tracking-[0.18em] text-(--muted-2)">
            PREVIEW
          </div>
          <div className="mt-3 space-y-3">
            {images.map((src, idx) => (
              <div
                key={`${src}-${idx}`}
                className="overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)]"
              >
                <button
                  type="button"
                  onClick={() => setZoomSrc(src)}
                  className="group relative block w-full cursor-zoom-in"
                  aria-label="Увеличить изображение"
                >
                  <Image
                    src={src}
                    alt={`${project.name} preview ${idx + 1}`}
                    width={1200}
                    height={700}
                    className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.35),transparent_55%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(5,5,5,0.55)] px-3 py-1 text-[12px] text-foreground opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
                    увеличить
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ImageLightbox
        open={zoomSrc !== null}
        src={zoomSrc ?? images[0]}
        alt={`${project.name} image`}
        onClose={() => setZoomSrc(null)}
      />
    </Modal>
  );
}

function formatHost(href: string) {
  if (href === "#") return "private";
  try {
    return new URL(href).host.replace(/^www\./, "");
  } catch {
    return href;
  }
}
