const allowedTags = new Set([
  "p", "h2", "h3", "strong", "b", "em", "i", "u", "ul", "ol", "li", "blockquote", "br", "a", "img",
]);

export function sanitizeRichHtml(input: string) {
  const withoutDangerousBlocks = input.replace(/<(script|style|iframe|object|svg|math)[^>]*>[\s\S]*?<\/\1\s*>/gi, "");
  return withoutDangerousBlocks.replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (tag, rawName: string, attrs: string) => {
    const name = rawName.toLowerCase();
    if (!allowedTags.has(name)) return "";
    if (tag.startsWith("</")) return `</${name}>`;
    if (name === "br") return "<br>";
    if (name === "img") {
      const src = attrs.match(/src\s*=\s*(["'])(.*?)\1/i)?.[2]?.trim() ?? "";
      const alt = attrs.match(/alt\s*=\s*(["'])(.*?)\1/i)?.[2]?.trim() ?? "";
      if (!src.startsWith("/api/uploads/") && !/^https:\/\//i.test(src)) return "";
      return `<img src="${src.replace(/"/g, "&quot;")}" alt="${alt.replace(/"/g, "&quot;")}">`;
    }
    if (name === "a") {
      const href = attrs.match(/href\s*=\s*(["'])(.*?)\1/i)?.[2]?.trim() ?? "";
      if (/^(https?:\/\/|mailto:|\/|#)/i.test(href) && !href.startsWith("//")) {
        const safeHref = href.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
        return `<a href="${safeHref}" rel="nofollow noopener noreferrer">`;
      }
    }
    return `<${name}>`;
  });
}
