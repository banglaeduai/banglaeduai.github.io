"use client";

import { useLayoutEffect } from "react";
import { Moon, Sun } from "lucide-react";

import { systemPrefersDark, THEME_KEY } from "@/lib/theme";

/**
 * A single icon button: a moon in the light theme, a sun in the dark one.
 *
 * Which icon shows is decided in CSS by the `dark:` variant rather than in
 * JavaScript, so the button renders identically on the server and on the
 * client and there is nothing for React to disagree about during hydration.
 * The label stays the same in both states for the same reason.
 */
export function ThemeToggle() {
  // In development, React's Strict Mode remounts once and resets `<html>` to
  // the attributes it manages itself, dropping the class the inline script
  // set. Re-applying it here, before paint, puts it back. A no-op in
  // production, where the remount never happens.
  useLayoutEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_KEY);
    } catch {
      // Unreadable storage: fall back to the system preference.
    }
    const dark =
      stored === "dark" || (stored !== "light" && systemPrefersDark());
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  function toggle() {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    } catch {
      // The choice applies to this page; it just will not survive a reload.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title="Switch between the light and dark theme"
      aria-label="Switch between the light and dark theme"
      className="-mr-2 shrink-0 rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <Moon className="size-4 dark:hidden" aria-hidden />
      <Sun className="hidden size-4 dark:block" aria-hidden />
    </button>
  );
}
