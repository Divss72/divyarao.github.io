/**
 * Normalizes image paths to ensure they resolve reliably across all client routes
 * (e.g., '/', '/projects', '/projects/:slug', etc.).
 *
 * Prepends a leading '/' for relative public assets while preserving absolute,
 * data, or blob URLs.
 */
export function normalizeImagePath(src?: string): string {
  if (!src) return '';
  const trimmed = src.trim();
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('//')
  ) {
    return trimmed;
  }
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}
