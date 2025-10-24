import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// 引入 @lobehub/ui 样式
import '@lobehub/ui/es/styles';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
