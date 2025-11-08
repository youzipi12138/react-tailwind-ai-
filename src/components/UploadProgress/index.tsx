import { useState } from 'react';
import { ActionIcon } from '@lobehub/ui';
import { X } from 'lucide-react';
import { Progress } from 'antd';
import { useImageStore } from '@/store/images';

export const UploadProgress = () => {
  const { progress } = useImageStore();
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className='upload-progress-container bg-myModalBgColor flex w-[360px] flex-col overflow-hidden rounded-lg transition-all duration-300'
      style={{ height: isExpanded ? '455px' : '120px' }}
    >
      <div className='header text-myTexthighlight border-borderColor hover:bg-MyMenuHoverColor flex h-[60px] shrink-0 items-center rounded-t-lg border-b-2 px-4'>
        <div className='text-myTexthighlight'>上传进度列表</div>
        <div className='ml-auto'>
          <ActionIcon icon={X} color='white'></ActionIcon>
        </div>
      </div>
      <div
        className='body text-myTexthighlight flex-1 overflow-y-auto transition-all duration-300'
        style={{
          maxHeight: isExpanded ? '335px' : '0',
          opacity: isExpanded ? 1 : 0,
          overflow: 'hidden',
        }}
      >
        <div className='item flex h-[60px] flex-col p-4'>
          <div>fasdfasdffsadf文件名 {progress}%</div>
          <Progress
            percent={progress}
            percentPosition={{ align: 'start', type: 'outer' }}
            showInfo={false}
            strokeWidth={4}
          />
        </div>
      </div>
      <div
        className='footer border-borderColor flex h-[60px] shrink-0 cursor-pointer items-center justify-center rounded-b-lg border-t-2'
        onClick={handleToggle}
      >
        {isExpanded ? '收起' : '展开'}
      </div>
    </div>
  );
};
