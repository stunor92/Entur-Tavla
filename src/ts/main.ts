import { isToday } from 'date-fns';

/**
 * If date is today this returns date in natural language,
 * if the date is later than today it returns weekday with the time.
 * 
 * Example:
 * - i dag kl. 12:00
 * - mandag kl. 12:00
 * 
 * @param time Datetime from Yr
 * @returns formatted date
 */
export function getFormattedDate(time: string) {
  const date = new Date(time);

  const formattedDate = new Intl.DateTimeFormat('no', {
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);

  if (isToday(date)) {
    return (formattedDate).replace(`${date.toLocaleString('default', {weekday: 'long'})}`, 'i dag')
  }

  return formattedDate;
}

export function formatNumber(number: string | number, format: string | undefined = undefined) {
  if (format) {
    return new Intl.NumberFormat('no', {
      style: 'unit',
      unit: format,
      maximumFractionDigits: Number(number) < 1 && format == 'millimeter' ? 1 : 0
    }).format(Number(number));
  }
  return new Intl.NumberFormat('no', { maximumFractionDigits: 0 }).format(Number(number));
}
