import { useState, useEffect, useCallback } from 'react';

const generateRandomNumbers = () => {
  const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
};

export const useSchulteGame = () => {
  const [gridNumbers, setGridNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completionTime, setCompletionTime] = useState('');
  const [showNumbers, setShowNumbers] = useState(false);

  const resetGame = useCallback(() => {
    setGridNumbers(generateRandomNumbers());
    setCurrentNumber(1);
    setStartTime(null);
    setIsPlaying(false);
    setCompletionTime('');
    setShowNumbers(false);
  }, []);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const startGame = () => {
    setShowNumbers(true);
    setIsPlaying(true);
    setStartTime(Date.now());
  };

  const handleGridClick = (number: number) => {
    if (!showNumbers || !isPlaying || number !== currentNumber) return;
    
    if (number === 25) {
      const finishTime = Date.now();
      setIsPlaying(false);
      const timeSpent = ((finishTime - (startTime || 0)) / 1000).toFixed(2);
      setCompletionTime(timeSpent);
    } else {
      setCurrentNumber(prev => prev + 1);
    }
  };

  const formatCurrentTime = () => {
    if (!startTime || !isPlaying) return '0.00';
    return ((Date.now() - startTime) / 1000).toFixed(2);
  };

  return {
    gridNumbers,
    currentNumber,
    isPlaying,
    completionTime,
    showNumbers,
    startGame,
    resetGame,
    handleGridClick,
    formatCurrentTime,
  };
};