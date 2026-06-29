export function formatNumber(value: number): string {
  if (isNaN(value)) return '0';
  if (value >= 1e12) {
    return (value / 1e12).toFixed(2).replace(/\.00$/, '') + 'T';
  }
  if (value >= 1e9) {
    return (value / 1e9).toFixed(2).replace(/\.00$/, '') + 'B';
  }
  if (value >= 1e6) {
    return (value / 1e6).toFixed(2).replace(/\.00$/, '') + 'M';
  }
  if (value >= 1e3) {
    return (value / 1e3).toFixed(2).replace(/\.00$/, '') + 'K';
  }
  return value.toLocaleString();
}
