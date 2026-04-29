import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageContainer } from '@components/ui/PageContainer';
import { BackButton } from '@components/ui/BackButton';

const CookingResult = () => {
  const navigate = useNavigate();

  const renderSparkles = () => {
    const sparkles = [];
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2;
      const distance = 100 + Math.random() * 50;
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
      backgroundImage="/images/backgrounds/cooking-result-bg.png"
      overlayOpacity={0.05}
      className="flex items-center justify-center"
    >
      <BackButton onClick={() => navigate('/cooking-game')} />

      <motion.h1 
        className="absolute top-16 left-[45%] transform -translate-x-1/2 text-3xl sm:text-4xl font-bold text-white text-shadow-lg z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        烹饪中...
      </motion.h1>

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {renderSparkles()}
        <img
          src="/images/ui/full-pot.png"
          alt="美味佳肴"
          className="w-[600px] h-auto object-contain"
          style={{ transform: 'translateX(40px)' }}
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/400x300/FFD700/ffffff?text=烹饪中';
          }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-12 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.button
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xl font-bold py-3 px-8 rounded-full shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/cooking-finished')}
          animate={{
            boxShadow: ['0 0 10px rgba(255,165,0,0.5)', '0 0 20px rgba(255,165,0,0.8)', '0 0 10px rgba(255,165,0,0.5)']
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          点击继续烹饪
        </motion.button>
      </motion.div>
    </PageContainer>
  );
};

export default CookingResult;