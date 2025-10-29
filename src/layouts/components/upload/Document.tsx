import React from 'react';
import { Icon } from '@lobehub/ui';
import { Folder, Upload as UploadIcon } from 'lucide-react';
import type { MenuProps } from 'antd';
import { Upload, Dropdown } from 'antd';
import { useDocuments } from '@/hooks/useDocments';

const DocumentUpload: React.FC = () => {
  const { uploadDocument } = useDocuments();

  // 自定义上传逻辑（使用 store 的方法）
  const customUpload = async (file: File) => {
    try {
      await uploadDocument(file);
    } catch (error) {
      // 错误已经在 store 里处理了
      console.error('上传失败:', error);
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
          <div className='text-myTexthighlight'>上传文档</div>
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
          <div className='text-myTexthighlight'>上传文档文件夹</div>
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
          上传文档
        </div>
      </Dropdown>
    </div>
  );
};

export default DocumentUpload;
