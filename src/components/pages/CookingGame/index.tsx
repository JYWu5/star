import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageContainer } from '@components/ui/PageContainer';
import { BackButton } from '@components/ui/BackButton';
import { useCookingGame } from './hooks/useCookingGame';

const CookingGame = () => {
  const navigate = useNavigate();
  const { categories, selectedCategory, setSelectedCategory, getCategoryIngredients } = useCookingGame();

  const gridConfig = {
    originX: '19%',
    originY: '16%',
    width: '620px',
    height: '160px',
    cellCount: 4,
    rowGapSize: '19px',
    columnGapSize: '40px',
  };

  const ingredients = selectedCategory ? getCategoryIngredients(selectedCategory) : [];

  return (
    <PageContainer 
      backgroundImage="/images/backgrounds/cooking-bg.png"
      className="relative"
    >
      <BackButton onClick={() => navigate('/forest-scene')} />
      
      {/* 标题 */}
      <motion.h1 
        className="absolute top-[3%] left-1/2 transform -translate-x-1/2 text-2xl sm:text-3xl font-bold text-white text-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        森林烹饪游戏
      </motion.h1>
      
      {/* 左侧分类 */}
      <motion.div
        className="absolute left-[6.5%] top-[15%] flex flex-col gap-[30px]"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`w-28 h-28 flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 backdrop-blur-md border-2 cursor-pointer ${
              selectedCategory === category.id
                ? 'bg-white/70 text-indigo-800 border-indigo-300 shadow-lg'
                : 'bg-white/50 text-gray-800 border-gray-200 hover:border-indigo-300/50'
            }`}
          >
            <div className="w-full h-16 flex items-center justify-center">
              <img 
                src={category.imageUrl} 
                alt={category.name} 
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/60x60/FFD700/ffffff?text=${category.name}`;
                }}
              />
            </div>
            <div className="text-xs font-medium text-center mt-0.5">
              {category.name}
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* 食材网格 */}
      <motion.div
        className="absolute"
        style={{
          left: gridConfig.originX,
          top: gridConfig.originY,
          width: gridConfig.width,
          height: gridConfig.height,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {selectedCategory ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${gridConfig.cellCount}, 1fr)`,
              gridTemplateRows: `repeat(${gridConfig.cellCount}, 1fr)`,
              gap: `${gridConfig.rowGapSize} ${gridConfig.columnGapSize}`,
            }}
          >
            {ingredients.map((ingredient, index) => (
              <div key={ingredient.id} className="w-full h-full flex flex-col items-center justify-center">
                <motion.img
                  src={ingredient.imageUrl}
                  alt={ingredient.name}
                  className="w-3/4 h-3/4 object-contain cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/80x80/90EE90/ffffff?text=${ingredient.name}`;
                  }}
                />
                <motion.span
                  className="text-xs text-gray-800 font-medium mt-1 text-center"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.2, duration: 0.3 }}
                >
                  {ingredient.name}
                </motion.span>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col items-center justify-center w-full h-full bg-white/10 backdrop-blur-sm border border-white/30 p-10"
          >
            <i className="fa-solid fa-utensils text-5xl text-gray-600 mb-4"></i>
            <p className="text-gray-700 font-medium text-center px-4 text-lg">
              请从左侧选择一个食材分类
            </p>
          </motion.div>
        )}
      </motion.div>
      
      {/* 锅的图片 */}
      <motion.div
        className="absolute right-[-5%] top-[25%] transform -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <img 
          src="/images/ui/empty-pot.png" 
          alt="炒菜锅" 
          className="w-[40rem] h-auto object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </motion.div>
      
      {/* 开始烹饪按钮 */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/cooking-result')}
        className="absolute right-[15%] bottom-[5%] bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-20"
      >
        开始烹饪
      </motion.button>
    </PageContainer>
  );
};

export default CookingGame;