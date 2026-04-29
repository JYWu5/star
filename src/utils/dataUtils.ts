export const formatDate = (year: number, month: number, day: number): string => {
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

export const parseDate = (dateString: string): { year: number; month: number; day: number } | null => {
  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  return {
    year: parseInt(match[1]),
    month: parseInt(match[2]),
    day: parseInt(match[3]),
  };
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

export const generateYearOptions = (startYear: number = 1950): number[] => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);
};

export const generateMonthOptions = (): number[] => {
  return Array.from({ length: 12 }, (_, i) => i + 1);
};

export const generateDayOptions = (daysInMonth: number): number[] => {
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};