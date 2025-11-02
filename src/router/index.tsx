import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from '@/pages/Chat';
import Knowledge from '@/pages/Knowledge';
import Art from '@/pages/Art';
import Explore from '@/pages/Explore';
import Login from '@/pages/login';
import Register from '@/pages/register';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <Routes>
      {/* 全局路由 - 不包含布局 */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      {/* 需要登录的路由 */}
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Navigate to='/chat' replace />
          </ProtectedRoute>
        }
      />
      <Route
        path='/chat'
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
      <Route
        path='/knowledge'
        element={
          <ProtectedRoute>
            <Knowledge />
          </ProtectedRoute>
        }
      />
      <Route
        path='/Files/:id'
        element={
          <ProtectedRoute>
            <div>Files</div>
          </ProtectedRoute>
        }
      />
      <Route
        path='/art'
        element={
          <ProtectedRoute>
            <Art />
          </ProtectedRoute>
        }
      />
      <Route
        path='/explore'
        element={
          <ProtectedRoute>
            <Explore />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
