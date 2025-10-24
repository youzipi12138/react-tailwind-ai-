import React from 'react'; // 需引入 React 类型

// 定义 Layouts 组件的 props 类型接口
interface LayoutsProps {
  // 每个属性都是 React 元素（JSX.Element），即传递的组件/内容
  sidenav: React.ReactNode; // 推荐用 ReactNode，支持元素、文本、null 等
  sideList: React.ReactNode;
  top: React.ReactNode;
  main: React.ReactNode;
}

const Layouts: React.FC<LayoutsProps> = props => {
  return (
    <div className='layout w-full h-screen flex text-white'>
      <div className='sidebar w-[75px] h-screen bg-primary  border-r-[2px] border-borderColor'>
        {props.sidenav}
      </div>
      <div className='content flex-1 flex'>
        <div className='sideList w-[320px] bg-primary border-r-[2px] border-borderColor '>
          {props.sideList}
        </div>
        <div className='main-content flex-1 flex flex-col'>
          <div className='topbar w-full bg-primary h-[52px] border-b-[2px] border-borderColor'>
            {props.top}
          </div>
          <div className='main bg-primary flex-1'>{props.main}</div>
        </div>
      </div>
    </div>
  );
};

export default Layouts;
