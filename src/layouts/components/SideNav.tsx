import React from 'react';
import { ActionIcon } from '@lobehub/ui';
import { Compass, FolderClosed, MessageSquare, Palette } from 'lucide-react';
import { avatar } from '@/assets';
import './SideNav.css';
const SideNav: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-between h-[300px] mt-10'>
      <div className='avatar w-[35px] h-[35px] rounded-full overflow-hidden'>
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
      <ActionIcon
        icon={MessageSquare}
        size='large'
        color='gray'
        title='对话'
        tooltipProps={{
          placement: 'right',
          overlayClassName: 'custom-tooltip',
        }}
        className='custom-action-icon'
      ></ActionIcon>
      <ActionIcon
        icon={FolderClosed}
        size='large'
        color='gray'
        title='知识库'
        tooltipProps={{
          placement: 'right',
          overlayClassName: 'custom-tooltip',
        }}
        className='custom-action-icon'
      ></ActionIcon>
      <ActionIcon
        icon={Palette}
        size='large'
        color='gray'
        title='AI 绘画'
        tooltipProps={{
          placement: 'right',
          overlayClassName: 'custom-tooltip',
        }}
        className='custom-action-icon'
      ></ActionIcon>
      <ActionIcon
        icon={Compass}
        size='large'
        color='gray'
        title='发现'
        tooltipProps={{
          placement: 'right',
          overlayClassName: 'custom-tooltip',
        }}
        className='custom-action-icon'
      ></ActionIcon>
    </div>
  );
};

export default SideNav;
