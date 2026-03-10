/**
 * Для GitHub Pages (сайт в подпути) и локальной разработки.
 * В workflow задаётся NEXT_PUBLIC_BASE_PATH (например /vizit).
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${p}`;
}
