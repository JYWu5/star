import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { TestResult } from '../../types';

interface GameContextType {
  userBirthday: string | null;
  selectedGender: 'male' | 'female' | null;
  selectedCharacter: string | null;
  testResult: TestResult | null;
  dreamProgress: Record<string, boolean>;
  fairyProgress: Record<string, boolean>;
  currentQuestionIndex: number;
  selectedAnswers: Record<string, number[]>;
  questions: any[];
  setUserBirthday: (date: string) => void;
  setSelectedGender: (gender: 'male' | 'female') => void;
  setSelectedCharacter: (character: string) => void;
  setTestResult: (result: TestResult) => void;
  setDreamProgress: (progress: Record<string, boolean>) => void;
  setFairyProgress: (progress: Record<string, boolean>) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setSelectedAnswers: (answers: Record<string, number[]>) => void;
  resetGame: () => void;
}

const defaultQuestions = [
  {
    id: 'q1',
    text: '探索者，请为你心中的核心渴求排序~',
    options: [
      { id: 1, text: '安稳休憩', imageUrl: '/images/test/bed.png' },
      { id: 2, text: '美食满足', imageUrl: '/images/test/burger.png' },
      { id: 3, text: '情感陪伴', imageUrl: '/images/test/heart-boy.png' },
      { id: 4, text: '财富掌控', imageUrl: '/images/test/money-bag.png' },
    ]
  }
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userBirthday, setUserBirthday] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [dreamProgress, setDreamProgress] = useState<Record<string, boolean>>({});
  const [fairyProgress, setFairyProgress] = useState<Record<string, boolean>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number[]>>({});

  const resetGame = () => {
    setUserBirthday(null);
    setSelectedGender(null);
    setSelectedCharacter(null);
    setTestResult(null);
    setDreamProgress({});
    setFairyProgress({});
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
  };

  return (
    <GameContext.Provider value={{
      userBirthday,
      selectedGender,
      selectedCharacter,
      testResult,
      dreamProgress,
      fairyProgress,
      currentQuestionIndex,
      selectedAnswers,
      questions: defaultQuestions,
      setUserBirthday,
      setSelectedGender,
      setSelectedCharacter,
      setTestResult,
      setDreamProgress,
      setFairyProgress,
      setCurrentQuestionIndex,
      setSelectedAnswers,
      resetGame,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGameContext must be used within GameProvider');
  return context;
};