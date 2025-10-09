export function getStringDate(offsetDays: number, hour?: string): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  if (!hour) return `${year}-${month}-${day}`;
  return `${year}-${month}-${day}T${hour}:00:00`;
}
