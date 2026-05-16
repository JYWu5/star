// index.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
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
      {/* 登录保护：未登录跳回登录页 */}
      <Route path="/" element={user ? <Welcome /> : <Navigate to="/login" />} />
      <Route path="/birthday-selection" element={user ? <BirthdaySelection /> : <Navigate to="/login" />} />
      <Route path="/gender-selection" element={user ? <GenderSelection /> : <Navigate to="/login" />} />
      <Route path="/character-selection" element={user ? <CharacterSelection /> : <Navigate to="/login" />} />
      <Route path="/forest-scene" element={user ? <ForestScene /> : <Navigate to="/login" />} />
      <Route path="/test" element={user ? <Test /> : <Navigate to="/login" />} />
      <Route path="/result" element={user ? <Result /> : <Navigate to="/login" />} />
      <Route path="/world-selection" element={user ? <WorldSelection /> : <Navigate to="/login" />} />
      <Route path="/schulte-grid" element={user ? <SchulteGrid /> : <Navigate to="/login" />} />
      <Route path="/cooking-game" element={user ? <CookingGame /> : <Navigate to="/login" />} />
      <Route path="/cooking-result" element={user ? <CookingResult /> : <Navigate to="/login" />} />
      <Route path="/cooking-finished" element={user ? <CookingFinished /> : <Navigate to="/login" />} />
      <Route path="/painting" element={user ? <Painting /> : <Navigate to="/login" />} />

      {/* 登录页 */}
      <Route path="/login" element={<AuthForm />} />

      {/* 未知路径跳回首页 */}
      <Route path="*" element={user ? <Navigate to="/" /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRouter;