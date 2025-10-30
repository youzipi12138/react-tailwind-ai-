import React from 'react';
import { Icon } from '@lobehub/ui';
import { Folder, Upload as UploadIcon } from 'lucide-react';
import type { MenuProps } from 'antd';
import { Upload, Dropdown } from 'antd';
import { css, cx } from 'antd-style';
import { useImages } from '@/hooks/useImages';

// dropdown menu item是relative布局的，所以需要使用css来设置 是定位区域
// .ant-dropdown-menu-item {
//   position: relative;
//   display: flex
// ;
//   align-items: center;
// }

const hotArea = css`
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: transparent;
  }
`;

const ImagesUpload: React.FC = () => {
  const { uploadImage } = useImages();

  // 自定义上传逻辑（使用 store 的方法）
  const customUpload = async (file: File) => {
    try {
      await uploadImage(file);
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
          <div className={cx(hotArea, 'text-myTexthighlight')}>上传图片</div>
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
          <div className={cx(hotArea, 'text-myTexthighlight')}>
            上传图片文件夹
          </div>
        </Upload>
      ),
      icon: <Icon icon={Folder} />,
    },
  ];
  return (
    <div>
      {' '}
      <Dropdown menu={{ items }} placement='bottomLeft' trigger={['click']}>
        <div className='border-mycolorlogo text-myTexthighlight ml-4 cursor-pointer rounded-sm border px-2 py-1'>
          上传图片
        </div>
      </Dropdown>
    </div>
  );
};

export default ImagesUpload;
