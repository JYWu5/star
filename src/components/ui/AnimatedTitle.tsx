import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedTitleProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedTitle = ({ children, delay = 0.3, className = '' }: AnimatedTitleProps) => {
  return (
    <motion.h1 
      className={`text-2xl sm:text-3xl font-bold text-white text-center text-shadow-lg px-4 py-2 inline-block ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {children}
    </motion.h1>
  );
};