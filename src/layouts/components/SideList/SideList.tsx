import React from 'react';
import PanelHeader from '@/components/panelHeader';
import Menu from './components/Menu';
import AckBase from './components/ackBase';
const SideList: React.FC = () => {
  return (
    <div>
      <div className='header'>
        <PanelHeader />
      </div>
      <div className='body'>
        <Menu />
        <AckBase />
      </div>
    </div>
  );
};

export default SideList;
