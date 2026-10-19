export function formatDate(value: string) {
  if (!value) return "";
  return value.replaceAll("-", ".");
}

export function readingTime(content: string) {
  const chars = content.replace(/\s/g, "").length;
  return Math.max(1, Math.round(chars / 300));
}
