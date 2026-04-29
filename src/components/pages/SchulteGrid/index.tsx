import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageContainer } from '@components/ui/PageContainer';
import { BackButton } from '@components/ui/BackButton';
import { useSchulteGame } from './hooks/useSchulteGame';

const SchulteGrid = () => {
  const navigate = useNavigate();
  const {
    gridNumbers,
    currentNumber,
    isPlaying,
    completionTime,
    showNumbers,
    startGame,
    resetGame,
    handleGridClick,
    formatCurrentTime,
  } = useSchulteGame();

  const handleBack = () => {
    localStorage.setItem('fromSchulteGrid', 'true');
    navigate('/forest-scene');
  };

  return (
    <PageContainer 
  backgroundImage="/images/backgrounds/schulte-bg.png"
  overlayOpacity={0.1}
  className="flex flex-col items-center min-h-screen p-4 relative"
>
  <BackButton onClick={handleBack} />

  {/* 排行榜 */}
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3 }}
    className="absolute left-4 lg:left-[5%] top-1/2 -translate-y-1/2 z-20"
  >
    <img
      src="/images/ui/ranking-board.png"
      alt="排行榜"
      className="h-48 sm:h-56 object-contain"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
  </motion.div>
  
  {/* 主内容区：整体在画面中间 */}
  <div className="flex-1 flex flex-col items-center justify-center w-full z-10">
    {/* 标题 */}
    <motion.h1 
      className="text-2xl sm:text-3xl font-bold text-black text-center text-shadow-lg mb-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      舒尔特方格
    </motion.h1>
    
    {/* 说明文字 */}
    <motion.div 
      className="flex items-center justify-center flex-wrap gap-2 sm:gap-4 mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <p className="text-base text-gray-800 font-medium">
        舒尔特方格是一种注意力练习工具
      </p>
      <p className="text-base text-gray-800 font-medium">
        请按顺序从1点击到25，越快完成越好
      </p>
    </motion.div>
    
    {/* 游戏时间/提示 */}
    <motion.div 
      className="text-center mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      {isPlaying && (
        <span className="bg-gray-300/80 text-gray-800 text-lg sm:text-xl font-semibold px-3 py-1 rounded-full">
          当前用时: {formatCurrentTime()}秒
        </span>
      )}
      {completionTime && (
        <span className="bg-gray-300/80 text-gray-800 text-lg sm:text-xl font-semibold px-3 py-1 rounded-full">
          完成时间: {completionTime}秒
        </span>
      )}
      {!isPlaying && !completionTime && (
        <span className="bg-gray-300/80 text-gray-800 px-3 py-1 rounded-full">
          按顺序点击数字1-25
        </span>
      )}
    </motion.div>
    
    {/* 舒尔特方格：调宽到 max-w-lg，缩小格子文字，适配书本 */}
    <motion.div 
      className="grid grid-cols-5 gap-2 sm:gap-3 w-full max-w-lg mx-auto mb-8 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {gridNumbers.map((number) => (
        <motion.div
          key={number}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleGridClick(number)}
          className={`aspect-square flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-extrabold rounded-lg cursor-pointer transition-all duration-300 backdrop-blur-md border border-black ${
            (number === currentNumber - 1 && isPlaying) || (number === 25 && !isPlaying && completionTime)
              ? 'bg-yellow-400/80 text-white shadow-lg scale-105' 
              : 'bg-white/90 text-gray-800 hover:bg-white'
          }`}
        >
          {showNumbers ? number : ''}
        </motion.div>
      ))}
    </motion.div>
    
    {/* 按钮 */}
    <motion.div 
      className="flex justify-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={startGame}
        disabled={isPlaying}
        className={`px-6 py-2 font-bold rounded-full shadow-lg transition-all duration-300 ${
          isPlaying 
            ? 'bg-gray-400 text-white cursor-not-allowed' 
            : 'bg-gradient-to-r from-green-500 to-teal-500 text-white'
        }`}
      >
        开始
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={resetGame}
        className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-full shadow-lg"
      >
        重置
      </motion.button>
    </motion.div>
  </div>
</PageContainer>
  );
};

export default SchulteGrid;