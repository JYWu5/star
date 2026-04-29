import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../../contexts/GameContext';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { PageContainer } from '@components/ui/PageContainer';

const WorldSelection = () => {
  const navigate = useNavigate();
  const { dreamProgress, fairyProgress } = useGameContext();
  const [isDreamWorldAnimating, setIsDreamWorldAnimating] = useState(true);

  const calculateProgress = (progressMap: Record<string, boolean>) => {
    const total = Object.keys(progressMap).length;
    const explored = Object.values(progressMap).filter(Boolean).length;
    return total === 0 ? 0 : Math.round((explored / total) * 100);
  };

  const dreamWorldProgress = calculateProgress(dreamProgress);
  const fairyWorldProgress = calculateProgress(fairyProgress);

  const handleDreamWorldSelect = () => {
    setIsDreamWorldAnimating(false);
    setTimeout(() => navigate('/dream-world'), 300);
  };

  const handleFairyWorldSelect = () => {
    navigate('/fairy-world');
  };

  return (
    <PageContainer 
      backgroundImage="/images/backgrounds/world-selection-bg.png"
      className="flex flex-col items-center justify-center p-4"
    >
      {/* 左侧引导角色 */}
      <motion.div
        className="absolute left-32 top-[30%] transform -translate-y-1/2 z-10 flex items-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="relative">
          <img 
            src="/images/characters/left-guide.png" 
            alt="梦世界引导角色" 
            className="w-64 h-auto object-contain"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/250x350/FFB6C1/ffffff?text=引导角色';
            }}
          />
          
          <motion.div 
            className="absolute right-0 -top-10 transform translate-x-full bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.6 }}
          >
            <p className="text-gray-800 font-medium">我们来精灵王国看看吧</p>
            <div className="absolute left-0 top-full transform -translate-x-1/2 w-4 h-4 bg-white/90 rotate-45"></div>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
          选择探索世界
        </h2>
        <p className="text-base text-gray-800 mb-6 text-center font-medium">
          根据你的测试结果，现在可以选择进入以下世界进行冒险：
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDreamWorldSelect}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 shadow-md cursor-pointer transition-all duration-300 border border-indigo-100"
            animate={isDreamWorldAnimating ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-indigo-700">梦世界</h3>
              <div className="text-3xl">🌙</div>
            </div>
            <p className="text-gray-700 mb-3 text-sm">
              探索你潜意识中的卧室，发现隐藏的秘密。
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${dreamWorldProgress}%` }}></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              探索进度: {dreamWorldProgress}%
            </p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFairyWorldSelect}
            className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 shadow-md cursor-pointer transition-all duration-300 border border-pink-100"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-pink-700">精灵王国</h3>
              <div className="text-3xl">🧚</div>
            </div>
            <p className="text-gray-700 mb-3 text-sm">
              在神奇的地图上探索情绪森林、勇气瀑布等地。
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-pink-600 h-2 rounded-full" style={{ width: `${fairyWorldProgress}%` }}></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              探索进度: {fairyWorldProgress}%
            </p>
          </motion.div>
        </div>
        
        <div className="flex justify-center mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/result')}
            className="px-6 py-2.5 bg-black/30 backdrop-blur-sm text-white font-medium rounded-full hover:bg-black/60 transition-all duration-300"
          >
            查看结果
          </motion.button>
        </div>
      </div>
    </PageContainer>
  );
};

export default WorldSelection;