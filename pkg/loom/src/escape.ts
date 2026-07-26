/**
 * @alwatr/loom — HTML escaping.
 *
 * Escapes the five characters that are unsafe in HTML text and double-quoted
 * attribute values. This is applied to every dynamic string by default; use
 * `raw()` to opt a value out.
 */
const ESCAPE_RE = /[&<>"']/g;
const ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export const escapeHtml = (value: string): string => value.replace(ESCAPE_RE, (char) => ESCAPE_MAP[char]!);
