import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../../contexts/GameContext';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { PageContainer } from '@components/ui/PageContainer';

const Result = () => {
  const navigate = useNavigate();
  const { testResult, setCurrentQuestionIndex, setSelectedAnswers } = useGameContext();

  if (!testResult) {
    navigate('/test');
    return null;
  }

  const radarData = [
    { subject: '休憩安稳度', value: testResult['休憩安稳度'] || 0, fullMark: 25 },
    { subject: '食欲满足度', value: testResult['食欲满足度'] || 0, fullMark: 25 },
    { subject: '情感陪伴度', value: testResult['情感陪伴度'] || 0, fullMark: 25 },
    { subject: '现实掌控感', value: testResult['现实掌控感'] || 0, fullMark: 25 },
  ];

  const handleToWorldSelection = () => {
    navigate('/world-selection');
  };

  const handleBackToTest = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    navigate('/test');
  };

  return (
    <PageContainer 
      backgroundImage="/images/backgrounds/result-bg.jpg"
      overlayOpacity={0.2}
      className="flex flex-col items-center justify-center p-4"
    >
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          测试结果
        </h2>
        
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-md mb-6">
          <p className="text-base text-gray-800 mb-4">
            {testResult.summary}
          </p>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#cbd5e0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#718096' }} />
                <PolarRadiusAxis angle={30} domain={[0, 25]} tick={{ fill: '#718096' }} />
                <Radar
                  name="心理特质"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToWorldSelection}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            选择探索世界
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBackToTest}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 font-medium rounded-full hover:bg-gray-300 transition-all duration-300"
          >
            重新测试
          </motion.button>
        </div>
      </div>
    </PageContainer>
  );
};

export default Result;