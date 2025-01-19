export function transformSearchText(search: string | null): string {
  return (search?.trim() ?? '')
    .replace(/[^\w\s\u0400-\u04FF]/gi, '')
    .slice(0, 255);
}
