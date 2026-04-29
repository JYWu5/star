import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageContainer } from '@components/ui/PageContainer';
import { BackButton } from '@components/ui/BackButton';
import { AnimatedTitle } from '@components/ui/AnimatedTitle';
import { useGameContext } from '../../contexts/GameContext';

const CharacterSelection = () => {
  const navigate = useNavigate();
  const { setSelectedCharacter } = useGameContext();

  const characters = [
    {
      id: 'fairy-girl',
      name: '精灵少女',
      image: '/images/characters/fairy-girl.png',
    },
    {
      id: 'jellyfish-spirit',
      name: '水母精灵',
      image: '/images/characters/jellyfish-spirit.png',
    }
  ];

  const handleCharacterSelect = (characterId: string) => {
    localStorage.setItem('selectedCharacter', characterId);
    setSelectedCharacter(characterId);
    navigate('/forest-scene');
  };

  return (
    <PageContainer 
  backgroundImage="/images/backgrounds/character-bg.jpg"
  overlayOpacity={0.1}
  className="flex flex-col items-center min-h-screen p-4"
>
  {/* 返回按钮保持原样 */}
  <BackButton onClick={() => navigate('/gender-selection')} />
  
  {/* 标题独占一行并居中，加大上边距 */}
  <div className="w-full text-center mt-8">
    <AnimatedTitle delay={0.3}>选择你的角色</AnimatedTitle>
  </div>
  
  {/* 角色选择区域：占据剩余空间并在其中垂直居中，加大上边距让标题和角色距离更远 */}
  <div className="flex-1 flex flex-col items-center justify-center w-full mt-16">
    <motion.div
      className="flex flex-col sm:flex-row gap-8 w-full max-w-4xl justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {characters.map((character, index) => (
        <motion.div
          key={character.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + index * 0.2 }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 30px rgba(255, 255, 255, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleCharacterSelect(character.id)}
          className="cursor-pointer flex flex-col items-center"
        >
          <motion.div className="relative mb-4">
            <img 
              src={character.image} 
              alt={character.name} 
              className="w-64 h-auto object-contain max-h-[400px]"
              onError={(e) => {
                e.currentTarget.src = `https://placehold.co/300x400/87CEEB/ffffff?text= ${encodeURIComponent(character.name)}`;
              }}
            />
            
            <motion.div
              className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 -z-10"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  </div>
  
  {/* 底部提示：加大上边距推到最底部 */}
  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.5, duration: 1 }}
    className="w-full text-center text-white text-lg font-medium text-shadow-lg mt-auto mb-4"
  >
    点击任一角色开始测试之旅...
  </motion.p>
</PageContainer>
  );
};

export default CharacterSelection;