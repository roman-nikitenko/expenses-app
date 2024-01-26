export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

export function getDateMinusDays(data, days) {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate() - days)
}
