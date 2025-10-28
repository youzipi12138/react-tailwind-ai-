import React, { useState } from 'react';

import { ActionIcon } from '@lobehub/ui';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useUIStore } from '@/store/ui';
import { useImages } from '@/hooks/useImages';
import type { MenuProps } from 'antd';
import { Dropdown, Upload } from 'antd';
import { Icon } from '@lobehub/ui';
import { Folder, Upload as UploadIcon } from 'lucide-react';

const TopBar: React.FC = () => {
  const { isSideListCollapsed, toggleSideList } = useUIStore();
  const { uploadImage } = useImages();
  const [inputValue, setInputValue] = useState('');

  // 自定义上传逻辑（使用 store 的方法）
  const customUpload = async (file: File) => {
    try {
      await uploadImage(file);
    } catch {
      // 错误已经在 store 里处理了
    }
  };

  const items: MenuProps['items'] = [
    {
      key: 'uploadFile',
      label: (
        <Upload
          customRequest={async ({ file }) => {
            await customUpload(file as File);
          }}
          showUploadList={false}
        >
          <div className='text-myTexthighlight'>上传文件</div>
        </Upload>
      ),
      icon: <Icon icon={UploadIcon} />,
    },
    {
      key: 'uploadFolder',
      label: (
        <Upload
          directory
          customRequest={async ({ file }) => {
            await customUpload(file as File);
          }}
          showUploadList={false}
        >
          <div className='text-myTexthighlight'>上传文件夹</div>
        </Upload>
      ),
      icon: <Icon icon={Folder} />,
    },
  ];

  return (
    <div className='ml-4 flex h-full items-center'>
      <ActionIcon
        icon={isSideListCollapsed ? PanelLeftOpen : PanelLeftClose}
        color='var(--color-myTextColor)'
        onClick={toggleSideList}
      />
      <input
        type='text'
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder='搜索文件...'
        className='border-myInputBorder bg-myInputBgColor text-myTexthighlight placeholder-myTextColor focus:border-myInputBorderFocus ml-4 w-[300px] rounded-sm border px-2 py-1 outline-none'
      />
      <Dropdown menu={{ items }} placement='bottomLeft'>
        <div className='border-mycolorlogo text-myTexthighlight ml-4 cursor-pointer rounded-sm border px-2 py-1'>
          上传文件
        </div>
      </Dropdown>
    </div>
  );
};

export default TopBar;
