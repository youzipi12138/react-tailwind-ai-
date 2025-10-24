import React, { useState } from 'react';
import MenuItemAck from './MenuItemAck';
import { LayoutGrid, FileText, Image, Mic, Video } from 'lucide-react';

const Menu: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { icon: LayoutGrid, title: '全部文件' },
    { icon: FileText, title: '文档' },
    { icon: Image, title: '图片' },
    { icon: Mic, title: '语音' },
    { icon: Video, title: '视频' },
  ];

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <div className='body'>
        {menuItems.map((item, index) => (
          <div key={index} onClick={() => handleItemClick(index)}>
            <MenuItemAck
              icon={item.icon}
              title={item.title}
              active={activeIndex === index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
