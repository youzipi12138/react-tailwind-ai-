import React from 'react';
import PanelHeader from '@/components/panelHeader';

const SideList: React.FC = () => {
  return (
    <div>
      <div className='header'>
        <PanelHeader />
      </div>
      <div className='body'></div>
    </div>
  );
};

export default SideList;
