import React, { useState } from 'react';

import { ActionIcon } from '@lobehub/ui';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useUIStore } from '@/store/ui';
import type { MenuProps } from 'antd';
import { Dropdown, Upload, message } from 'antd';
import { Icon } from '@lobehub/ui';
import { Folder, Upload as UploadIcon } from 'lucide-react';
import type { UploadProps } from 'antd';

const props: UploadProps = {
  name: 'file_to_upload',
  action: 'http://localhost:4000/api/upload',
  headers: {
    // authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      // message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const items: MenuProps['items'] = [
  {
    key: 'uploadFile',
    label: (
      <Upload {...props} showUploadList={false}>
        <div className='text-myTexthighlight'>上传文件</div>
      </Upload>
    ),
    icon: <Icon icon={UploadIcon} />,
    onClick: () => {
      // console.log('上传文件');
    },
  },
  {
    key: 'uploadFolder',
    label: '上传文件夹',
    icon: <Icon icon={Folder} />,
    onClick: () => {
      console.log('上传文件夹');
    },
  },
];

const TopBar: React.FC = () => {
  const { isSideListCollapsed, toggleSideList } = useUIStore();
  const [inputValue, setInputValue] = useState('');

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
