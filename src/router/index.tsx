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

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/birthday-selection" element={<BirthdaySelection />} />
      <Route path="/gender-selection" element={<GenderSelection />} />
      <Route path="/character-selection" element={<CharacterSelection />} />
      <Route path="/forest-scene" element={<ForestScene />} />
      <Route path="/test" element={<Test />} />
      <Route path="/result" element={<Result />} />
      <Route path="/world-selection" element={<WorldSelection />} />
      <Route path="/schulte-grid" element={<SchulteGrid />} />
      <Route path="/cooking-game" element={<CookingGame />} />
      <Route path="/cooking-result" element={<CookingResult />} />
      <Route path="/cooking-finished" element={<CookingFinished />} />
      <Route path="/painting" element={<Painting />} />
    </Routes>
  );
};

export default AppRouter;