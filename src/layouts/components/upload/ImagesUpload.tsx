import React from 'react';
import { Icon } from '@lobehub/ui';
import { Folder, Upload as UploadIcon } from 'lucide-react';
import type { MenuProps } from 'antd';
import { Upload, Dropdown } from 'antd';
import { useImages } from '@/hooks/useImages';

const ImagesUpload: React.FC = () => {
  // 自定义上传逻辑（使用 store 的方法）
  const customUpload = async (file: File) => {
    try {
      await uploadImage(file);
    } catch {
      // 错误已经在 store 里处理了
    }
  };
  const { uploadImage } = useImages();
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
          <div className='text-myTexthighlight'>上传图片</div>
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
          <div className='text-myTexthighlight'>上传图片文件夹</div>
        </Upload>
      ),
      icon: <Icon icon={Folder} />,
    },
  ];
  return (
    <div>
      {' '}
      <Dropdown menu={{ items }} placement='bottomLeft'>
        <div className='border-mycolorlogo text-myTexthighlight ml-4 cursor-pointer rounded-sm border px-2 py-1'>
          上传文件
        </div>
      </Dropdown>
    </div>
  );
};

export default ImagesUpload;
