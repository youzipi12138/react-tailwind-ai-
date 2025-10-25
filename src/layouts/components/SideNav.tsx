import React, { useState } from 'react';
import { ActionIcon } from '@lobehub/ui';
import {
  Compass,
  FolderClosed,
  MessageSquare,
  Palette,
  SunMedium,
  MoonStar,
} from 'lucide-react';

import { Link, useLocation } from 'react-router-dom';
import { avatar } from '@/assets';
import './SideNav.css';
const SideNav: React.FC = () => {
  const location = useLocation();

  const [isSun, setIsSun] = useState(false);

  return (
    <div className='flex flex-col items-center justify-between h-[300px] mt-10'>
      <div className='avatar w-[35px] h-[35px] rounded-full overflow-hidden mb-4'>
        <a
          href='https://github.com/youzipi12138'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            src={avatar}
            alt=''
            className='w-full h-full rounded-full object-cover cursor-pointer'
          ></img>
        </a>
      </div>
      <Link to='/chat'>
        <ActionIcon
          icon={MessageSquare}
          size='large'
          color={location.pathname === '/chat' ? 'blue' : 'gray'}
          title='对话'
          tooltipProps={{
            placement: 'right',
            overlayClassName: 'custom-tooltip',
          }}
          className='custom-action-icon'
        ></ActionIcon>
      </Link>
      <Link to='/knowledge'>
        <ActionIcon
          icon={FolderClosed}
          size='large'
          color={location.pathname === '/knowledge' ? 'blue' : 'gray'}
          title='知识库'
          tooltipProps={{
            placement: 'right',
            overlayClassName: 'custom-tooltip',
          }}
          className='custom-action-icon'
        ></ActionIcon>
      </Link>
      <Link to='/art'>
        <ActionIcon
          icon={Palette}
          size='large'
          color={location.pathname === '/art' ? 'blue' : 'gray'}
          title='AI 绘画'
          tooltipProps={{
            placement: 'right',
            overlayClassName: 'custom-tooltip',
          }}
          className='custom-action-icon'
        ></ActionIcon>
      </Link>
      <Link to='/explore'>
        <ActionIcon
          icon={Compass}
          size='large'
          color={location.pathname === '/explore' ? 'blue' : 'gray'}
          title='发现'
          tooltipProps={{
            placement: 'right',
            overlayClassName: 'custom-tooltip',
          }}
          className='custom-action-icon'
        ></ActionIcon>
      </Link>
      <ActionIcon icon={isSun ? SunMedium : MoonStar} color='gray'></ActionIcon>
    </div>
  );
};

export default SideNav;
