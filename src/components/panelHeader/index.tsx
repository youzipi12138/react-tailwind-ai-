import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'antd';
const PanelHeader: React.FC = () => {
  const location = useLocation();
  const pathName: string = location.pathname;

  return (
    <div>
      {pathName === '/chat' && (
        <div className='pl-5 pt-5'>
          <h1 className='text-[26px] font-semibold mb-1 text-lightTextColor'>
            AI chat
          </h1>
          <p className='text-[12px] text-darkTextColor'>开启问答之旅</p>
        </div>
      )}
      {pathName === '/knowledge' && (
        <div className='pl-5 pt-5'>
          <h1 className='text-[26px] font-semibold mb-1 text-lightTextColor'>
            知识库
          </h1>
          <p className='text-[12px] text-darkTextColor'>管理，你的知识</p>
        </div>
      )}
      {pathName === '/art' && (
        <div className='pl-5 pt-5'>
          <h1 className='text-[26px] font-semibold mb-1 text-lightTextColor'>
            绘画
          </h1>
          <p className='text-[12px] text-darkTextColor'>简单描述，即刻创作</p>
        </div>
      )}
      {pathName === '/explore' && (
        <div className='pl-5 pt-5'>
          <h1 className='text-[26px] font-semibold mb-1 text-lightTextColor'>
            绘画
          </h1>
          <p className='text-[12px] text-darkTextColor'>简单描述，即刻创作</p>
        </div>
      )}
    </div>
  );
};

export default PanelHeader;
