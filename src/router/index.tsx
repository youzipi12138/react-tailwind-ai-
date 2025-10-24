import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from '@/pages/Chat';
import Knowledge from '@/pages/Knowledge';
import Art from '@/pages/Art';
import Explore from '@/pages/Explore';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/chat' replace />} />
      <Route path='/chat' element={<Chat />} />
      <Route path='/knowledge' element={<Knowledge />} />
      <Route path='/art' element={<Art />} />
      <Route path='/explore' element={<Explore />} />
    </Routes>
  );
};

export default AppRouter;
