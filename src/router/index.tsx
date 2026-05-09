import { Routes, Route } from 'react-router-dom';
import Welcome from '../components/pages/Welcome';
import BirthdaySelection from '../components/pages/BirthdaySelection';
import GenderSelection from '../components/pages/GenderSelection';
import CharacterSelection from '../components/pages/CharacterSelection';
import ForestScene from '../components/pages/ForestScene';
import Test from '../components/pages/Test';
import Result from '../components/pages/Result';
import WorldSelection from '../components/pages/WorldSelection';
import SchulteGrid from '../components/pages/SchulteGrid';
import CookingGame from '../components/pages/CookingGame';
import CookingResult from '../components/pages/CookingResult';
import CookingFinished from '../components/pages/CookingFinished';
import Painting from '../components/pages/Painting';
import AuthForm from '../components/AuthForm';

interface AppRouterProps {
  user: any;
}

const AppRouter = ({ user }: AppRouterProps) => {
  return (
    <Routes>
      {/* 登录保护：未登录显示 AuthForm */}
      <Route path="/" element={user ? <Welcome /> : <AuthForm />} />
      <Route path="/birthday-selection" element={user ? <BirthdaySelection /> : <AuthForm />} />
      <Route path="/gender-selection" element={user ? <GenderSelection /> : <AuthForm />} />
      <Route path="/character-selection" element={user ? <CharacterSelection /> : <AuthForm />} />
      <Route path="/forest-scene" element={user ? <ForestScene /> : <AuthForm />} />
      <Route path="/test" element={user ? <Test /> : <AuthForm />} />
      <Route path="/result" element={user ? <Result /> : <AuthForm />} />
      <Route path="/world-selection" element={user ? <WorldSelection /> : <AuthForm />} />
      <Route path="/schulte-grid" element={user ? <SchulteGrid /> : <AuthForm />} />
      <Route path="/cooking-game" element={user ? <CookingGame /> : <AuthForm />} />
      <Route path="/cooking-result" element={user ? <CookingResult /> : <AuthForm />} />
      <Route path="/cooking-finished" element={user ? <CookingFinished /> : <AuthForm />} />
      <Route path="/painting" element={user ? <Painting /> : <AuthForm />} />

      {/* 未知路径跳回首页或登录 */}
      <Route path="*" element={user ? <Welcome /> : <AuthForm />} />
    </Routes>
  );
};

export default AppRouter;