import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageContainer } from '@components/ui/PageContainer';
import { BackButton } from '@components/ui/BackButton';
import { AnimatedTitle } from '@components/ui/AnimatedTitle';
import { useGameContext } from '../../contexts/GameContext';

const GenderSelection = () => {
  const navigate = useNavigate();
  const { setSelectedGender } = useGameContext();

  const handleGenderSelect = (gender: 'male' | 'female') => {
    localStorage.setItem('selectedGender', gender);
    setSelectedGender(gender);
    navigate('/character-selection');
  };

  return (
   <PageContainer 
  backgroundImage="/images/backgrounds/gender-bg.jpg"
  overlayOpacity={0.1}
  className="flex flex-col items-center min-h-screen p-4"
>
  {/* 返回按钮保持原样，不动 */}
  <BackButton onClick={() => navigate('/birthday-selection')} />
  
  {/* 标题独占一行并居中 */}
  <div className="w-full text-center mt-4">
    <AnimatedTitle delay={0.3}>请选择您的性别</AnimatedTitle>
  </div>
  
  {/* 性别选择：占据剩余空间并在其中垂直居中，自然往下推 */}
  <div className="flex-1 flex flex-col items-center justify-center w-full">
    <motion.div
      className="flex flex-col sm:flex-row gap-10 w-full max-w-3xl justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <GenderOption 
        icon="fa-person" 
        label="男" 
        color="blue" 
        onClick={() => handleGenderSelect('male')}
      />
      <GenderOption 
        icon="fa-person-dress" 
        label="女" 
        color="pink"
        onClick={() => handleGenderSelect('female')}
      />
    </motion.div>
  </div>
  
  {/* 底部提示：自然排在最下方，居中 */}
  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.5, duration: 1 }}
    className="w-full text-center text-white text-lg font-medium text-shadow-lg mb-4"
  >
    请选择您的性别以继续...
  </motion.p>
</PageContainer>
  );
};

const GenderOption = ({ 
  icon, 
  label, 
  color, 
  onClick 
}: { 
  icon: string; 
  label: string; 
  color: 'blue' | 'pink';
  onClick: () => void;
}) => {
  const bgColor = color === 'blue' ? 'bg-blue-500/20 hover:bg-blue-500/30' : 'bg-pink-500/20 hover:bg-pink-500/30';
  const textColor = color === 'blue' ? 'text-blue-300' : 'text-pink-300';
  const shadowColor = color === 'blue' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(219, 39, 119, 0.5)';

  return (
    <motion.div
      initial={{ opacity: 0, x: color === 'blue' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7 }}
      whileHover={{ 
        scale: 1.1,
        boxShadow: `0 0 30px ${shadowColor}`,
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="cursor-pointer flex flex-col items-center"
    >
      <motion.div
        className={`relative mb-4 ${bgColor} p-6 rounded-full backdrop-blur-sm transition-all`}
        whileHover={{ scale: 1.1 }}
      >
        <i className={`fa-solid ${icon} text-9xl ${textColor}`}></i>
      </motion.div>
      
      <motion.div
        className="bg-white/30 backdrop-blur-sm text-white font-bold px-8 py-3 rounded-full text-xl"
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
};

export default GenderSelection;