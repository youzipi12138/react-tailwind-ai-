import React from 'react';
import PanelHeader from '@/components/panelHeader';
import Menu from './components/Menu';

const SideList: React.FC = () => {
  return (
    <div>
      <div className='header'>
        <PanelHeader />
      </div>
      <div className='body'>
        <Menu />
      </div>
    </div>
  );
};

export default SideList;
