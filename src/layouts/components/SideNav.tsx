import React, { useState, useEffect, useRef } from 'react';
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
import Usercard from './Card';
const SideNav: React.FC = () => {
  const location = useLocation();

  const [isSun, setIsSun] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);

  // 点击外部区域关闭 Card
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showCard &&
        cardRef.current &&
        !cardRef.current.contains(event.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setShowCard(false);
      }
    };

    if (showCard) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCard]);

  return (
    <div className='relative mt-10 flex h-[300px] flex-col items-center justify-between'>
      <div className='mb-4 h-[35px] w-[35px] overflow-hidden rounded-full'>
        <img
          ref={avatarRef}
          src={avatar}
          alt=''
          className='h-full w-full cursor-pointer rounded-full object-cover'
          onClick={() => setShowCard(!showCard)}
        ></img>
      </div>
      {showCard && (
        <div ref={cardRef} className='absolute top-[-30px] left-[2px] z-10'>
          <Usercard />
        </div>
      )}
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
