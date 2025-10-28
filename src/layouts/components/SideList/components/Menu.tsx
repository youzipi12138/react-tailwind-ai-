import React, { useEffect, useState } from 'react';
import MenuItemAck from './MenuItemAck';
import { LayoutGrid, FileText, Image, Mic, Video } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// 菜单项配置（移到组件外部，避免重复创建）
const menuItems = [
  { icon: LayoutGrid, title: '全部文件', category: '' }, // 无参数表示全部
  { icon: FileText, title: '文档', category: 'documents' },
  { icon: Image, title: '图片', category: 'images' },
  { icon: Mic, title: '语音', category: 'audio' },
  { icon: Video, title: '视频', category: 'video' },
];

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeIndex, setActiveIndex] = useState(0);

  //根据 URL 参数设置默认选中项 （支持通过url选中）
  useEffect(() => {
    const category = searchParams.get('category');
    const index = menuItems.findIndex(
      item => item.category === (category || '')
    );
    setActiveIndex(index !== -1 ? index : 0);
  }, [searchParams]);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    const category = menuItems[index].category;

    // 如果是"全部文件"，不添加查询参数
    if (category === '') {
      navigate('/knowledge');
    } else {
      // 其他选项添加 category 查询参数
      navigate(`/knowledge?category=${category}`);
    }
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
