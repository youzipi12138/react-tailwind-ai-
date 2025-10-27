import React, { useState } from 'react';

import { ActionIcon } from '@lobehub/ui';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useUIStore } from '@/store/ui';

const TopBar: React.FC = () => {
  const { isSideListCollapsed, toggleSideList } = useUIStore();
  const [inputValue, setInputValue] = useState('');

  return (
    <div className='ml-4 flex h-full items-center'>
      <ActionIcon
        icon={isSideListCollapsed ? PanelLeftOpen : PanelLeftClose}
        color='var(--color-myTextColor)'
        onClick={toggleSideList}
      />
      <input
        type='text'
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder='搜索文件...'
        className='border-myInputBorder bg-myInputBgColor text-myTexthighlight placeholder-myTextColor focus:border-myInputBorderFocus ml-4 w-[300px] rounded-sm border px-2 py-1 outline-none'
      />
    </div>
  );
};

export default TopBar;
