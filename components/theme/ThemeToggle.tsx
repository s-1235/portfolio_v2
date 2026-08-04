"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => mo.disconnect();
}

export default function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme === "dark",
    () => false,
  );
  const toggle = () => {
    if (dark) {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = "dark";
    }
    try {
      localStorage.setItem("theme", dark ? "light" : "dark");
    } catch {}
  };
  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="rounded-full border border-line px-1.5 py-0.5 text-xs text-muted transition hover:text-ink sm:px-3 sm:py-1.5 sm:text-sm"
    >
      {dark ? "☾" : "☀"}
    </button>
  );
}
