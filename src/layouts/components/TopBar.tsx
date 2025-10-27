import React from 'react';

import { ActionIcon } from '@lobehub/ui';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useUIStore } from '@/store/ui';

const TopBar: React.FC = () => {
  const { isSideListCollapsed, toggleSideList } = useUIStore();

  return (
    <div className='ml-4 flex h-full items-center'>
      <ActionIcon
        icon={isSideListCollapsed ? PanelLeftOpen : PanelLeftClose}
        color='var(--color-myTextColor)'
        onClick={toggleSideList}
      />
      <input type='text' />
    </div>
  );
};

export default TopBar;
