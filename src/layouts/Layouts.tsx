import React from 'react'; // 需引入 React 类型
import { useUIStore } from '@/store/ui';

// 定义 Layouts 组件的 props 类型接口
interface LayoutsProps {
  // 每个属性都是 React 元素（JSX.Element），即传递的组件/内容
  sidenav: React.ReactNode; // 推荐用 ReactNode，支持元素、文本、null 等
  sideList: React.ReactNode;
  top: React.ReactNode;
  main: React.ReactNode;
}

const Layouts: React.FC<LayoutsProps> = props => {
  const { isSideListCollapsed } = useUIStore();

  return (
    <div className='layout flex h-screen w-full text-white'>
      <div className='sidebar bg-primary border-borderColor h-screen w-[75px] border-r-2'>
        {props.sidenav}
      </div>
      <div className='content flex flex-1'>
        <div
          className={`sideList bg-primary border-borderColor border-r-2 transition-all duration-300 ${
            isSideListCollapsed ? 'w-0 overflow-hidden' : 'w-[270px]'
          }`}
        >
          {props.sideList}
        </div>
        <div className='main-content flex flex-1 flex-col'>
          <div className='topbar bg-primary border-borderColor h-[60px] w-full border-b-2'>
            {props.top}
          </div>
          <div className='main bg-primary flex-1'>{props.main}</div>
        </div>
      </div>
    </div>
  );
};

export default Layouts;
