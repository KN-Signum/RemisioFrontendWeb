export function formatDateDisplay(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}.${m}.${y}`;
}
