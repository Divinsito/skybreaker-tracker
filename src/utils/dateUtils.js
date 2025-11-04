// src/utils/dateUtils.js

export const getApril2025Weekdays = () => {
  const dates = [];
  let date = new Date('2025-04-01T00:00:00'); 
  const end = new Date('2025-05-01T00:00:00'); 

  while (date < end) {
    const dayOfWeek = date.getDay();
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const isoDate = date.toISOString().split('T')[0];
      dates.push(isoDate);
    }
    date.setDate(date.getDate() + 1);
  }
  return dates;
};

export const dateFormatter = new Intl.DateTimeFormat('es-ES', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

export const createDateFromISO = (isoDate) => {
  return new Date(isoDate + 'T00:00:00');
};