import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageContainer } from '@components/ui/PageContainer';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <PageContainer 
      backgroundImage="/images/backgrounds/welcome-bg.png"
      className="flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/birthday-selection')}
          className="cursor-pointer"
        >
          <img 
            src="/images/ui/start-button.png" 
            alt="开始游戏" 
            className="max-w-full h-auto max-h-[650px] drop-shadow-2xl"
            onError={(e) => {
              // 如果图片加载失败，显示备用按钮
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = '<button class="px-12 py-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl font-bold rounded-full shadow-2xl">开始游戏</button>';
            }}
          />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="mt-8 text-white/80 text-sm font-medium"
        >
          点击按钮开始你的冒险之旅...
        </motion.p>
      </motion.div>
    </PageContainer>
  );
};

export default Welcome;