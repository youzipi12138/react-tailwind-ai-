import React from 'react';
import { Icon } from '@lobehub/ui';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import {
  LucideLoader2,
  MoreVertical,
  PencilLine,
  Trash,
  Book,
} from 'lucide-react';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: '重命名',
    icon: <Icon icon={PencilLine} />,
  },
  {
    key: '2',
    label: '删除',
    icon: <Icon icon={Trash} />,
    danger: true,
  },
];

const Menu: React.FC = () => {
  return (
    <div className='Menu text-myTexthighlight'>
      <div className='Menu-item mx-2 my-2 h-[40px] rounded-md flex  justify-between px-2 items-center hover:bg-MyMenuHoverColor group'>
        <Icon icon={Book}></Icon>
        <span className='flex-1 mx-4 text-ellipsis overflow-hidden whitespace-nowrap text-[14px]'>
          知识库的名称知识库的名称知sadfasfsdfasf
        </span>
        <Dropdown menu={{ items }} trigger={['click']}>
          <Icon
            icon={MoreVertical}
            onClick={() => console.log(11)}
            className='cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200'
          ></Icon>
        </Dropdown>
      </div>
      <div className='Menu-item mx-2 my-2 h-[40px] rounded-md flex  justify-between px-2 items-center hover:bg-MyMenuHoverColor group'>
        <Icon icon={Book}></Icon>
        <span className='flex-1 mx-4 text-ellipsis overflow-hidden whitespace-nowrap text-[14px]'>
          知识库的名称知识库的名称知sadfasfsdfasf
        </span>
        <Dropdown menu={{ items }} trigger={['click']}>
          <Icon
            icon={MoreVertical}
            onClick={() => console.log(11)}
            className='cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200'
          ></Icon>
        </Dropdown>
      </div>
      <div className='Menu-item mx-2 my-2 h-[40px] rounded-md flex  justify-between px-2 items-center hover:bg-MyMenuHoverColor group'>
        <Icon icon={Book}></Icon>
        <span className='flex-1 mx-4 text-ellipsis overflow-hidden whitespace-nowrap text-[14px]'>
          知识库的名称知识库的名称知sadfasfsdfasf
        </span>
        <Dropdown menu={{ items }} trigger={['click']}>
          <Icon
            icon={MoreVertical}
            onClick={() => console.log(11)}
            className='cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200'
          ></Icon>
        </Dropdown>
      </div>
      <div className='Menu-item mx-2 my-2 h-[40px] rounded-md flex  justify-between px-2 items-center hover:bg-MyMenuHoverColor group'>
        <Icon icon={Book}></Icon>
        <span className='flex-1 mx-4 text-ellipsis overflow-hidden whitespace-nowrap text-[14px]'>
          知识库的名称知识库的名称知sadfasfsdfasf
        </span>
        <Dropdown menu={{ items }} trigger={['click']}>
          <Icon
            icon={MoreVertical}
            onClick={() => console.log(11)}
            className='cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200'
          ></Icon>
        </Dropdown>
      </div>
    </div>
  );
};

export default Menu;
