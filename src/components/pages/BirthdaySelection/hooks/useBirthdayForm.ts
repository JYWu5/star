import { useState, useEffect, useMemo } from 'react';
import { useGameContext } from '../../../contexts/GameContext';

export const useBirthdayForm = () => {
  const { setUserBirthday } = useGameContext();
  const currentYear = new Date().getFullYear();
  
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());
  const [daysInMonth, setDaysInMonth] = useState(31);

  const years = useMemo(() => 
    Array.from({ length: currentYear - 1950 + 1 }, (_, i) => 1950 + i),
  [currentYear]);

  const months = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => i + 1),
  []);

  const days = useMemo(() => 
    Array.from({ length: daysInMonth }, (_, i) => i + 1),
  [daysInMonth]);

  useEffect(() => {
    const newDaysInMonth = new Date(year, month, 0).getDate();
    setDaysInMonth(newDaysInMonth);
    if (day > newDaysInMonth) setDay(newDaysInMonth);
  }, [year, month, day]);

  const saveBirthday = () => {
    const formatted = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    localStorage.setItem('userBirthday', formatted);
    setUserBirthday(formatted);
  };

  return {
    year, month, day,
    years, months, days,
    setYear, setMonth, setDay,
    saveBirthday,
  };
};