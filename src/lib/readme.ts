const EXCERPT_MAX = 600;

/**
 * README markdown to a plain-text excerpt for the project quick view. Replacement ORDER is
 * load-bearing throughout: each pattern below relies on the previous ones not having run
 * yet, and reordering them yields gibberish rather than an error.
 */
export function toExcerpt(markdown: string, maxLength = EXCERPT_MAX): string {
  const text = markdown
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/~~~[\s\S]*?~~~/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    // Before emphasis, so `flutter\_carousel\_widget` is plain snake_case by the time the
    // pair matching below runs.
    .replace(/\\([\\`*_{}[\]()#+\-.!])/g, "$1")
    // Linked images before plain images before links.
    .replace(/\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    // Nav lists must go while still recognisable AS links: once [text](url) becomes text, a
    // table of contents is indistinguishable from prose and eats the excerpt budget.
    .replace(/^[ \t]*(?:[-*+]|\d+\.)[ \t]*\[[^\]]+\]\([^)]*\)[ \t]*$/gm, " ")
    .replace(/^[ \t]*#{1,6}[ \t]*table of contents?[ \t]*$/gim, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\[[^\]]+\]:\s*\S+.*$/gm, " ")
    .replace(/\[([^\]]+)\]\[[^\]]*\]/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, " ")
    .replace(/^\s{0,3}>\s?/gm, " ")
    .replace(/^\s{0,3}[-*+]\s+/gm, " ")
    .replace(/^\s{0,3}\d+\.\s+/gm, " ")
    .replace(/^\s{0,3}([-*_])\s*(\1\s*){2,}$/gm, " ")
    .replace(/\|/g, " ")
    // Emphasis as matched PAIRS, never a character class: `_` is literal inside identifiers,
    // so stripping every one turns pg_dump into pgdump.
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/(^|[^A-Za-z0-9_])\*([^*\n]+)\*(?![A-Za-z0-9_])/g, "$1$2")
    .replace(/(^|[^A-Za-z0-9_])_([^_\n]+)_(?![A-Za-z0-9_])/g, "$1$2")
    .replace(/`/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}...`;
}
