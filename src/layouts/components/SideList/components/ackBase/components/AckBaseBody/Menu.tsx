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

import type { FolderItem } from '@/services/File/types/folder';
import { useFolders } from '@/hooks/useFolders';
import { useNavigate } from 'react-router-dom';
interface MenuPropsComponent {
  folders: FolderItem[];
  onDelete: (id: string) => Promise<void>;
}

const items: MenuProps['items'] = [
  {
    key: 'rename',
    label: '重命名',
    icon: <Icon icon={PencilLine} />,
  },
  {
    key: 'delete',
    label: '删除',
    icon: <Icon icon={Trash} />,
    danger: true,
  },
];

const Menu: React.FC<MenuPropsComponent> = ({ folders, onDelete }) => {
  // 处理菜单点击事件
  const handleMenuClick = (folder: FolderItem, menuKey: string) => {
    switch (menuKey) {
      case 'rename':
        // TODO: 打开重命名对话框
        // console.log('重命名文件夹:', folder.id);
        break;
      case 'delete':
        // TODO: 删除文件夹
        // console.log('删除文件夹:', folder.id);
        onDelete(folder.id);
        break;
    }
  };
  // 跳转路由
  const navigate = useNavigate();

  return (
    <div className='Menu text-myTexthighlight'>
      {folders.map(folder => (
        <div
          className='Menu-item hover:bg-MyMenuHoverColor group mx-2 my-2 flex h-[40px] cursor-pointer items-center justify-between rounded-md px-2'
          key={folder.id}
          style={{
            animation: 'fadeIn 0.3s ease-in-out', // 新增项淡入动画
            transition: 'all 0.2s ease-in-out', // 位置变化平滑过渡
          }}
        >
          <Icon icon={Book}></Icon>
          <span
            className='mx-4 flex-1 overflow-hidden text-[14px] text-ellipsis whitespace-nowrap'
            onClick={() => navigate(`/Files/${folder.id}`)}
          >
            {folder.name}
          </span>
          <Dropdown
            menu={{
              items,
              onClick: ({ key }) => handleMenuClick(folder, key),
            }}
            trigger={['click']}
          >
            <Icon
              icon={MoreVertical}
              className='cursor-pointer opacity-0 transition-opacity duration-200 group-hover:opacity-100'
            ></Icon>
          </Dropdown>
        </div>
      ))}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Menu;
