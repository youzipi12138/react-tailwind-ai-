import React from 'react';
import PanelHeader from '@/components/panelHeader';
import Menu from './components/Menu';
import AckBase from './components/ackBase';
import { useLocation } from 'react-router-dom';
import FilesSide from './components/FileSide';
const SideList: React.FC = () => {
  const location = useLocation();
  const pathName: string = location.pathname;
  return (
    <div>
      <div className='header'>
        <PanelHeader />
      </div>
      <div className='body'>
        {pathName === '/knowledge' && (
          <div className='KnowledgeSide'>
            <Menu />
            <AckBase />
          </div>
        )}
        {pathName.startsWith('/Files/') && (
          <div className='FilesSide'>
            <FilesSide />
          </div>
        )}
      </div>
    </div>
  );
};

export default SideList;
