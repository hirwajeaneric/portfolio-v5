/**
 * Strip HTML tags and collapse whitespace for meta descriptions, OG tags, etc.
 */
export function stripHtmlForMeta(html: string, maxLength = 280): string {
  if (!html) return "";
  const plain = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength - 1)}…`;
}
