export function validArrayResponseData(data: unknown): boolean {
  return Array.isArray(data) && data.length > 0;
}
