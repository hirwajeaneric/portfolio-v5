/**
 * Server-safe HTML sanitizer for rich text from Jodit and similar editors.
 * Strips scripts, dangerous URLs, and interactive elements before persist or render.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return "";

  let sanitized = html;

  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, "");
  sanitized = sanitized.replace(/javascript:/gi, "");
  sanitized = sanitized.replace(/data:(?!image\/)/gi, "");
  sanitized = sanitized.replace(/vbscript:/gi, "");
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "");
  sanitized = sanitized.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "");
  sanitized = sanitized.replace(/<embed\b[^>]*>/gi, "");
  sanitized = sanitized.replace(/<meta\b[^>]*>/gi, "");
  sanitized = sanitized.replace(/<link\b[^>]*>/gi, "");
  sanitized = sanitized.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
  sanitized = sanitized.replace(/<base\b[^>]*>/gi, "");
  sanitized = sanitized.replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, "");
  sanitized = sanitized.replace(/<input\b[^>]*>/gi, "");
  sanitized = sanitized.replace(/<button\b[^<]*(?:(?!<\/button>)<[^<]*)*<\/button>/gi, "");
  sanitized = sanitized.replace(/<select\b[^<]*(?:(?!<\/select>)<[^<]*)*<\/select>/gi, "");
  sanitized = sanitized.replace(/<textarea\b[^<]*(?:(?!<\/textarea>)<[^<]*)*<\/textarea>/gi, "");
  sanitized = sanitized.replace(
    /\s*(?:on\w+|javascript:|data-unsafe|data-js|data-url|data-src)=["'][^"']*["']/gi,
    ""
  );
  sanitized = sanitized.replace(/<p>\s*<\/p>/gi, "");
  sanitized = sanitized.replace(/\n\s*\n/g, "\n").replace(/[ \t]+/g, " ");

  return sanitized;
}
