"use client";

import { useSyncExternalStore } from "react";

// Theme = the visitor's choice (html[data-theme], saved in localStorage) or, until they choose, their device setting.
const media = () => window.matchMedia("(prefers-color-scheme: dark)");

function isDarkNow() {
  const t = document.documentElement.dataset.theme;
  return t ? t === "dark" : media().matches;
}

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const mq = media();
  mq.addEventListener("change", cb);
  return () => {
    mo.disconnect();
    mq.removeEventListener("change", cb);
  };
}

export function useIsDark() {
  return useSyncExternalStore(subscribe, isDarkNow, () => false);
}

export function toggleTheme() {
  const next = isDarkNow() ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {}
}
