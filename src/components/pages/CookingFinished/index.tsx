import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageContainer } from '@components/ui/PageContainer';
import { BackButton } from '@components/ui/BackButton';

const CookingFinished = () => {
  const navigate = useNavigate();

  const renderSparkles = () => {
    const sparkles = [];
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2;
      const distance = 80 + Math.random() * 60;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const size = 3 + Math.random() * 5;
      const opacity = 0.5 + Math.random() * 0.5;
      
      sparkles.push(
        <motion.div
          key={i}
          className="absolute bg-yellow-300 rounded-full"
          style={{
            width: size,
            height: size,
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
            opacity,
          }}
          animate={{ opacity: [opacity, 1, opacity], scale: [1, 1.5, 1] }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 2,
          }}
        />
      );
    }
    return sparkles;
  };

  return (
    <PageContainer 
      backgroundImage="/images/backgrounds/cooking-finished-bg.png"
      overlayOpacity={0.05}
      className="flex flex-col items-center justify-center"
    >
      <BackButton onClick={() => navigate('/cooking-result')} />

      <motion.h1 
        className="absolute top-16 text-3xl sm:text-4xl font-bold text-white text-shadow-lg z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        烹饪完成
      </motion.h1>

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {renderSparkles()}
        <img
          src="/images/ui/dish.png"
          alt="成品菜"
          className="w-[420px] h-auto object-contain mb-6"
          style={{ transform: 'translateX(24px) translateY(20px)' }}
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/300x250/FFD700/ffffff?text=美味佳肴';
          }}
        />

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.p 
            className="text-white text-xl font-bold text-shadow-lg mb-6"
            animate={{ textShadow: ['0 0 10px rgba(255,215,0,0.5)', '0 0 20px rgba(255,215,0,0.8)', '0 0 10px rgba(255,215,0,0.5)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            美味佳肴已完成，点击继续探索
          </motion.p>

          <motion.button
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-lg font-bold py-3 px-8 rounded-full shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/world-selection')}
            animate={{
              boxShadow: ['0 0 10px rgba(255,165,0,0.5)', '0 0 20px rgba(255,165,0,0.8)', '0 0 10px rgba(255,165,0,0.5)']
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            继续探索
          </motion.button>
        </motion.div>
      </motion.div>
    </PageContainer>
  );
};

export default CookingFinished;