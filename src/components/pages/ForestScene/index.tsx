import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageContainer } from '@components/ui/PageContainer';
import { BackButton } from '@components/ui/BackButton';
import { useMovableCharacter } from './hooks/useMovableCharacter';

const ForestScene = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { position, moveTo } = useMovableCharacter(100, 400);
  
  const [isBookFlashing, setIsBookFlashing] = useState(true);
  const [isWaterFlashing, setIsWaterFlashing] = useState(false);
  const [floatOffset, setFloatOffset] = useState(0);

  useEffect(() => {
    const fromSchulteGrid = localStorage.getItem('fromSchulteGrid') === 'true';
    if (fromSchulteGrid) {
      setIsWaterFlashing(true);
      setIsBookFlashing(false);
      localStorage.setItem('fromSchulteGrid', 'false');
    }
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFloatOffset(prev => {
        const newOffset = prev + 0.5;
        return newOffset > 10 ? -10 : newOffset;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleContainerClick = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  const markers = [
    {
      id: 'book',
      x: '45%',
      y: '60%',
      label: '星缕册',
      image: '/images/icons/book.png',
      size: '150px',
      onClick: () => {
        setIsBookFlashing(false);
        navigate('/schulte-grid');
      },
    },
    {
      id: 'fire',
      x: '70%',
      y: '35%',
      label: '暖火簇',
      image: '/images/icons/fire.png',
      size: '250px',
      onClick: () => navigate('/cooking-game'),
    },
    {
      id: 'painting',
      x: '55%',
      y: '45%',
      label: '云纹卷',
      image: '/images/icons/painting.png',
      size: '300px',
      onClick: () => navigate('/painting'),
    },
  ];

  return (
    <PageContainer 
      backgroundImage="/images/backgrounds/forest-bg.jpg"
      overlayOpacity={0.1}
      className="relative"
    >
      <div 
        ref={containerRef}
        className="absolute inset-0"
        onClick={handleContainerClick}
      >
        {/* 可移动角色 */}
        <motion.div
          className="absolute z-20 pointer-events-none"
          style={{
            left: position.x,
            top: position.y,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <motion.img
            src={position.direction === 'right' 
              ? '/images/characters/movable-right.png' 
              : '/images/characters/movable-left.png'}
            alt="可移动角色"
            className="w-40 h-auto object-contain"
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/150x150/FFB6C1/ffffff?text=角色`;
            }}
          />
        </motion.div>

        {/* 固定角色 - 映我水 */}
        <motion.div
          className="absolute cursor-pointer z-20"
          style={{ 
            left: '25%', 
            top: '30%',
            transform: `translate(-50%, calc(-50% + ${floatOffset}px))`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsWaterFlashing(false);
            navigate('/test');
          }}
        >
          <div className="relative">
            <motion.img 
              src="/images/characters/water-spirit.png" 
              alt="映我水" 
              className="w-60 h-auto object-contain"
              animate={isWaterFlashing ? {
                scale: [1, 1.05, 1, 0.95, 1],
              } : {}}
              transition={{ repeat: Infinity, duration: 0.6 }}
              onError={(e) => {
                e.currentTarget.src = `https://placehold.co/200x250/87CEEB/ffffff?text=映我水`;
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full text-white font-bold text-shadow-lg text-lg"
            >
              谈心伴
            </motion.div>
          </div>
        </motion.div>

        {/* 标记点 */}
        {markers.map((marker, index) => (
          <motion.div
            key={marker.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 15,
              delay: index * 0.2 
            }}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center bg-transparent z-10"
            style={{ left: marker.x, top: marker.y }}
            onClick={(e) => {
              e.stopPropagation();
              marker.onClick?.();
            }}
          >
            <motion.div className="relative flex flex-col items-center">
              <motion.img 
                src={marker.image} 
                alt={marker.label} 
                className="object-contain bg-transparent"
                style={{ width: marker.size, height: marker.size }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={marker.id === 'book' && isBookFlashing ? {
                  scale: [1, 1.1, 1, 0.9, 1],
                } : {}}
                transition={{ repeat: Infinity, duration: 0.8 }}
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/100x100/FFD700/ffffff?text=${marker.label}`;
                }}
              />
              <motion.div
                initial={{ opacity: 0, y: marker.id === 'fire' ? 10 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`absolute transform text-white font-bold text-shadow-lg text-lg ${
                  marker.id === 'fire' ? 'top-full mt-2' : 'bottom-full mb-2'
                }`}
              >
                {marker.label}
              </motion.div>
            </motion.div>
          </motion.div>
        ))}

        {/* 返回按钮和指示器 */}
        <div className="absolute top-4 left-4 flex items-center gap-4 z-30">
          <BackButton onClick={() => navigate('/')} />
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-2 text-white"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <div className="absolute w-full h-full rounded-full border-2 border-blue-300/50"></div>
              <motion.div 
                className="absolute w-2 h-2 rounded-full bg-blue-400"
                animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
            <span className="text-sm font-medium text-shadow-md">生理指标检测中</span>
          </motion.div>
        </div>

        {/* 提示文字 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-0 right-0 text-center text-white text-lg font-bold text-shadow-lg z-30"
        >
          点击映我水开始测试之旅...
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 1 }}
          className="absolute left-[25%] top-[75%] transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-bold text-shadow-lg z-30"
        >
          映我水
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default ForestScene;