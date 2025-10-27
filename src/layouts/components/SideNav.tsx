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
    <div className='mt-10 flex h-[300px] flex-col items-center justify-between'>
      <div className='avatar mb-4 h-[35px] w-[35px] overflow-hidden rounded-full'>
        <a
          href='https://github.com/youzipi12138'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            src={avatar}
            alt=''
            className='h-full w-full cursor-pointer rounded-full object-cover'
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
