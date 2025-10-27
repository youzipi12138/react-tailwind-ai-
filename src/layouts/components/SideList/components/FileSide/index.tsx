import React from 'react';
import { ActionIcon } from '@lobehub/ui';
import { Folder, FileIcon } from 'lucide-react';

const FilesSide: React.FC = () => {
  return (
    <div>
      <div className='mx-2 my-2 mb-5 flex items-center'>
        <ActionIcon icon={Folder} color='var(--color-myTexthighlight)' />
        <span className='text-mycolorlogo text-xl font-semibold'>123123</span>
      </div>
      <div className='text-myTextColor bg-MyMenuHoverColor mx-2 my-2 flex h-[45px] items-center rounded-md'>
        <ActionIcon icon={FileIcon} color='var(--color-myTextColor)' />
        <span>文档</span>
      </div>
    </div>
  );
};

export default FilesSide;
