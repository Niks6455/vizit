export function formatLink(href: string) {
  if (href.startsWith("mailto:")) return href.replace("mailto:", "");
  if (href.startsWith("tel:")) {
    const n = href.replace("tel:", "");
    return n.startsWith("+") ? n : `+${n}`;
  }
  try {
    const u = new URL(href);
    return u.host.replace(/^www\./, "");
  } catch {
    return href;
  }
}

