import { useState, useEffect } from 'react';
import { useGameContext } from '@contexts/GameContext';
import { useNavigate } from 'react-router-dom';

export const useTestLogic = () => {
  const navigate = useNavigate();
  const { 
    questions, 
    currentQuestionIndex, 
    setCurrentQuestionIndex, 
    selectedAnswers, 
    setSelectedAnswers,
    setTestResult 
  } = useGameContext();
  
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestion) {
      const savedOrder = selectedAnswers[currentQuestion.id] || [];
      setSelectedOrder(savedOrder as number[]);
    }
  }, [currentQuestionIndex, currentQuestion, selectedAnswers]);

  const handleOptionClick = (optionId: number) => {
    if (selectedOrder.includes(optionId)) return;
    
    const newOrder = [...selectedOrder, optionId];
    setSelectedOrder(newOrder);
    
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: newOrder
    });
  };

  const handleClearSelection = () => {
    setSelectedOrder([]);
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: []
    });
  };

  const getOptionPosition = (optionId: number): number | null => {
    const position = selectedOrder.indexOf(optionId);
    return position !== -1 ? position + 1 : null;
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const result = {
      "休憩安稳度": 28,
      "食欲满足度": 21,
      "情感陪伴度": 15,
      "现实掌控感": 10,
      summary: '你的休憩安稳度得分最高，你非常重视身心的平静与舒适。这种特质让你在繁忙的生活中能够保持内心的宁静，享受生活中的美好时刻。'
    };
    
    setTestResult(result);
    navigate('/result');
  };

  const hasCompleteSelection = selectedOrder.length === (currentQuestion?.options.length || 0);

  return {
    currentQuestion,
    selectedOrder,
    selectedAnswers,
    currentQuestionIndex,
    questions,
    handleOptionClick,
    handleClearSelection,
    getOptionPosition,
    handleNext,
    hasCompleteSelection,
  };
};