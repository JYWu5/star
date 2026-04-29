import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageContainer } from '@components/ui/PageContainer';
import { BackButton } from '@components/ui/BackButton';
import { AnimatedTitle } from '@components/ui/AnimatedTitle';
import { useBirthdayForm } from './hooks/useBirthdayForm';

const BirthdaySelection = () => {
  const navigate = useNavigate();
  const { year, month, day, years, months, days, setYear, setMonth, setDay, saveBirthday } = useBirthdayForm();

  const handleConfirm = () => {
    saveBirthday();
    navigate('/gender-selection');
  };

  return (
   <PageContainer 
  backgroundImage="/images/backgrounds/birthday-bg.jpg"
  overlayOpacity={0.2}
  className="flex flex-col items-center min-h-screen p-4 relative"
>
  {/* 返回按钮保持原样，不动 */}
  <BackButton onClick={() => navigate('/')} />
  
  {/* 标题+卡片整体：水平垂直都居中，并向下偏移 */}
  <div className="flex-1 flex flex-col items-center justify-center w-full mt-12">
    <AnimatedTitle delay={0.3}>请选择您的生日</AnimatedTitle>
    
    <motion.div
      className="glass-panel p-6 max-w-md w-full relative mt-24"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="grid grid-cols-3 gap-4 mb-8">
        <DateSelect label="年" value={year} options={years} onChange={setYear} delay={0.6} />
        <DateSelect label="月" value={month} options={months} onChange={setMonth} delay={0.7} />
        <DateSelect label="日" value={day} options={days} onChange={setDay} delay={0.8} />
      </div>

      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)" }}
        whileTap={{ scale: 0.95 }}
        onClick={handleConfirm}
        className="w-full ocean-gradient text-white font-bold py-3 rounded-full shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        确定
      </motion.button>
      
      <DecorativeBubbles />
    </motion.div>
  </div>
  
  <FloatingFish />
</PageContainer>
  );
};

const DateSelect = ({ label, value, options, onChange, delay }: {
  label: string;
  value: number;
  options: number[];
  onChange: (val: number) => void;
  delay: number;
}) => (
  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
    <label className="block text-white font-medium mb-2 text-center">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full bg-white/80 text-gray-800 border border-white/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </motion.div>
);

const DecorativeBubbles = () => (
  <>
    <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-blue-500/20 backdrop-blur-sm animate-pulse" />
    <div className="absolute -bottom-5 -right-5 w-16 h-16 rounded-full bg-purple-500/20 backdrop-blur-sm animate-pulse" 
         style={{ animationDelay: '0.5s' }} />
  </>
);

const FloatingFish = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div 
      className="absolute top-1/4 text-3xl"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: '150%', opacity: 1 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
    >
    
    </motion.div>
    <motion.div 
      className="absolute top-2/3 right-0 text-3xl transform scale-x-[-1]"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: '-150%', opacity: 1 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 1 }}
    >
      🐟🐟🐟
    </motion.div>
    <motion.div 
      className="absolute top-1/5 right-1/4 text-4xl"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: '150%', opacity: 1 }}
      transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
    >
      🎐
    </motion.div>
  </div>
);

export default BirthdaySelection;