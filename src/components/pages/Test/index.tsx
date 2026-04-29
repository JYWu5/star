import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageContainer } from '@components/ui/PageContainer';
import { BackButton } from '@components/ui/BackButton';
import { useTestLogic } from './hooks/useTestLogic';

const Test = () => {
  const navigate = useNavigate();
  const {
    currentQuestion,
    getOptionPosition,
    handleOptionClick,
    handleClearSelection,
    handleNext,
    hasCompleteSelection,
    currentQuestionIndex,
    questions,
  } = useTestLogic();

  const imageUrls = {
    left1: '/images/characters/left-guide.png',
    right1: '/images/characters/right-guide.png',
    left2: '/images/test/bed.png',
    right2: '/images/test/hurger.png',
    bottomLeft: '/images/test/heart-boy.png',
    bottomRight: '/images/test/money-bag.png',
  };

  const getOptionImage = (index: number): string => {
    if (index === 0) return imageUrls.left2;
    if (index === 1) return imageUrls.right2;
    if (index === 2) return imageUrls.bottomLeft;
    if (index === 3) return imageUrls.bottomRight;
    return '';
  };

  if (!currentQuestion) return null;

  return (
    <PageContainer 
      backgroundImage="/images/backgrounds/test-bg.png"
      overlayOpacity={0.1}
      className="flex flex-col p-4"
    >
      {/* 左侧角色 */}
      <motion.div 
        className="absolute left-[10%] top-1/2 transform -translate-y-1/2 z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img 
          src={imageUrls.left1} 
          alt="左侧角色" 
          className="w-80 h-auto object-contain"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/300x400/FFB6C1/ffffff?text=左侧引导';
          }}
        />
      </motion.div>

      {/* 右侧角色 */}
      <motion.div 
        className="absolute right-[10%] top-1/2 transform -translate-y-1/2 z-10"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img 
          src={imageUrls.right1} 
          alt="右侧角色" 
          className="w-64 h-auto object-contain"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/250x350/87CEEB/ffffff?text=右侧引导';
          }}
        />
      </motion.div>

      {/* 重新选择按钮 */}
      <div className="w-full max-w-4xl mx-auto mt-6 flex justify-center z-10">
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleClearSelection}
          className="px-5 py-2 bg-white/60 backdrop-blur-sm text-indigo-700 rounded-full hover:bg-white/80 transition-all duration-300 text-sm font-medium shadow-md"
        >
          重新选择
        </motion.button>
      </div>

      {/* 主内容区 */}
      <div className="flex-grow flex flex-col items-center max-w-4xl w-full mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/40 backdrop-blur-md text-white p-5 rounded-xl border border-white/20 shadow-2xl mb-10 w-full max-w-xl text-center"
        >
          <p className="text-xl font-medium leading-relaxed">{currentQuestion.text}</p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto grid grid-cols-2 gap-8 mt-12"
          >
            {currentQuestion.options.map((option:any, index:number) => {
              const position = getOptionPosition(option.id);
              const delays = [0.3, 0.4, 0.5, 0.6];
              
              return (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: delays[index] }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleOptionClick(option.id)}
                  className={`flex flex-col items-center justify-between p-2 rounded-xl text-center transition-all duration-300 backdrop-blur-md border-2 cursor-pointer h-[140px] w-[calc(100%-8px)] mx-auto ${
                    position !== null 
                      ? 'bg-indigo-100 text-indigo-800 border-indigo-300 shadow-lg' 
                      : 'bg-white/70 text-gray-800 border-gray-200 hover:border-indigo-300/50'
                  }`}
                >
                  <div className="w-20 h-20 mb-2 flex items-center justify-center">
                    <img 
                      src={getOptionImage(index)} 
                      alt={`选项 ${index + 1}`} 
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/80x80/FFD700/ffffff?text=${index + 1}`;
                      }}
                    />
                  </div>
                  
                  <div className="text-sm font-medium flex-grow flex items-center text-center">
                    {option.text}
                  </div>
                  
                  {position !== null && (
                    <motion.div 
                      className="absolute top-3 right-3 bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {position}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 底部按钮 */}
      <div className="w-full max-w-4xl mx-auto pb-24 px-4 flex justify-center z-10">
        <motion.button
          whileHover={{ scale: hasCompleteSelection ? 1.05 : 1 }}
          whileTap={{ scale: hasCompleteSelection ? 0.95 : 1 }}
          onClick={handleNext}
          disabled={!hasCompleteSelection}
          className={`px-8 py-3 font-medium rounded-full transition-all duration-300 ${
            hasCompleteSelection 
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg hover:shadow-xl' 
              : 'bg-white/10 text-white/50 cursor-not-allowed'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {currentQuestionIndex < questions.length - 1 ? '下一题' : '完成测试'}
        </motion.button>
      </div>

      <BackButton onClick={() => navigate('/forest-scene')} />
    </PageContainer>
  );
};

export default Test;