/**
 * Theme switching.
 *
 * The theme is a class on `<html>` — `dark`, or nothing at all — because that
 * is what `globals.css` and every `dark:` utility key off.
 *
 * There are three states, not two. An explicit "dark", an explicit "light",
 * and no stored choice at all, which follows the operating system. Only an
 * explicit choice is ever written to storage, so a visitor who never touches
 * the toggle keeps tracking their system setting instead of being pinned to
 * whichever theme they happened to load first.
 */
export const THEME_KEY = "theme";

/** True when the visitor's system is asking for a dark interface. */
export function systemPrefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/**
 * Runs in `<head>`, synchronously, while the browser is still parsing the
 * document — so the class is on `<html>` before the first paint and there is
 * no flash of the light theme on the way to the dark one. It cannot wait for
 * React: on a slow connection the browser paints the server HTML long before
 * hydration. See `preventing-flash-before-hydration` in the Next.js docs.
 *
 * The try/catch is for browsers where reading `localStorage` throws outright,
 * which is what private mode does in some of them.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})()`;
