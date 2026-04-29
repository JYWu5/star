import { ReactNode } from 'react';
import { motion as _motion} from 'framer-motion';

interface PageContainerProps {
  children: ReactNode;
  backgroundImage?: string;
  backgroundColor?: string;
  overlayOpacity?: number;
  className?: string;
}

export const PageContainer = ({ 
  children, 
  backgroundImage, 
  backgroundColor,
  overlayOpacity = 0.1,
  className = '' 
}: PageContainerProps) => {
  return (
    <div 
      className={`h-screen w-full relative overflow-hidden ${className}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundColor: backgroundColor,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />
      )}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};