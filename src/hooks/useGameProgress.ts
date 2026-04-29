import { useCallback } from 'react';
import { useGameContext } from '@contexts/GameContext';

export const useGameProgress = () => {
  const { dreamProgress, fairyProgress, setDreamProgress, setFairyProgress } = useGameContext();

  const markDreamLocationExplored = useCallback((locationId: string) => {
    setDreamProgress({ ...dreamProgress, [locationId]: true });
  }, [dreamProgress, setDreamProgress]);

  const markFairyLocationExplored = useCallback((locationId: string) => {
    setFairyProgress({ ...fairyProgress, [locationId]: true });
  }, [fairyProgress, setFairyProgress]);

  const getDreamProgressPercentage = useCallback(() => {
    const total = Object.keys(dreamProgress).length;
    if (total === 0) return 0;
    const explored = Object.values(dreamProgress).filter(Boolean).length;
    return Math.round((explored / total) * 100);
  }, [dreamProgress]);

  const getFairyProgressPercentage = useCallback(() => {
    const total = Object.keys(fairyProgress).length;
    if (total === 0) return 0;
    const explored = Object.values(fairyProgress).filter(Boolean).length;
    return Math.round((explored / total) * 100);
  }, [fairyProgress]);

  return {
    dreamProgress,
    fairyProgress,
    markDreamLocationExplored,
    markFairyLocationExplored,
    getDreamProgressPercentage,
    getFairyProgressPercentage,
  };
};