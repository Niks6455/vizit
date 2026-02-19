export const MAILRU_PIXEL_ID = "3743731";

export type MailRuPixelParams =
  | { type: "pageView"; start: number }
  | { type: "reachGoal"; id: string; goal: string };

declare global {
  interface Window {
    _tmr?: MailRuPixelParams[];
  }
}

export function reachGoal(goal: string): void {
  if (typeof window === "undefined") return;
  const _tmr = (window._tmr = window._tmr || []);
  _tmr.push({ type: "reachGoal", id: MAILRU_PIXEL_ID, goal });
}
