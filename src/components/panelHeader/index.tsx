import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeft } from 'lucide-react';
import { ActionIcon } from '@lobehub/ui';
import { useNavigate } from 'react-router-dom';
const PanelHeader: React.FC = () => {
  const location = useLocation();
  const pathName: string = location.pathname;
  const navigate = useNavigate();
  return (
    <div>
      {pathName === '/chat' && (
        <div className='pt-5 pl-5'>
          <h1 className='text-lightTextColor mb-1 text-[26px] font-semibold'>
            AI chat
          </h1>
          <p className='text-darkTextColor text-[12px]'>开启问答之旅</p>
        </div>
      )}
      {pathName === '/knowledge' && (
        <div className='pt-5 pl-5'>
          <h1 className='text-lightTextColor mb-1 text-[26px] font-semibold'>
            知识库
          </h1>
          <p className='text-darkTextColor text-[12px]'>管理，你的知识</p>
        </div>
      )}
      {pathName === '/art' && (
        <div className='pt-5 pl-5'>
          <h1 className='text-lightTextColor mb-1 text-[26px] font-semibold'>
            绘画
          </h1>
          <p className='text-darkTextColor text-[12px]'>简单描述，即刻创作</p>
        </div>
      )}
      {pathName === '/explore' && (
        <div className='pt-5 pl-5'>
          <h1 className='text-lightTextColor mb-1 text-[26px] font-semibold'>
            发现
          </h1>
          <p className='text-darkTextColor text-[12px]'>简单描述，即刻创作</p>
        </div>
      )}
      {pathName.startsWith('/Files/') && (
        <div
          className='text-myTextColor mx-2 my-2 flex cursor-pointer items-center'
          onClick={() => navigate(-1)}
        >
          <ActionIcon icon={ArrowLeft} color='var(--color-myTextColor)' />
          <span>返回</span>
        </div>
      )}
    </div>
  );
};

export default PanelHeader;
