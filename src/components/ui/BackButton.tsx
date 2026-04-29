import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

export const BackButton = ({ onClick, className = '' }: BackButtonProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`absolute top-4 left-4 px-4 py-2 bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/60 transition-all duration-300 z-50 flex items-center gap-2 ${className}`}
    >
      <ArrowLeft size={16} />
      <span>返回</span>
    </motion.button>
  );
};