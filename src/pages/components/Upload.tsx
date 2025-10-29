import React from 'react';
import { Plus } from 'lucide-react';
import { ActionIcon } from '@lobehub/ui';
const CreateIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' style={style}>
    <path
      d='M10.46 5.076l-.92-.752A1.446 1.446 0 008.626 4H3.429c-.38 0-.743.147-1.01.41A1.386 1.386 0 002 5.4v13.2c0 .371.15.727.418.99.268.262.632.41 1.01.41h17.143c.38 0 .743-.148 1.01-.41.268-.263.419-.619.419-.99V6.8c0-.371-.15-.727-.418-.99a1.444 1.444 0 00-1.01-.41h-9.198c-.334 0-.657-.115-.914-.324z'
      fill='#bd54c6'
      stroke='rgba(255, 255, 255, 0.10)'
      strokeWidth='0.5'
    ></path>
  </svg>
);
const UploadFolderIcon: React.FC<{ style?: React.CSSProperties }> = ({
  style,
}) => (
  <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' style={style}>
    <path
      d='M10.46 5.076l-.92-.752A1.446 1.446 0 008.626 4H3.429c-.38 0-.743.147-1.01.41A1.386 1.386 0 002 5.4v13.2c0 .371.15.727.418.99.268.262.632.41 1.01.41h17.143c.38 0 .743-.148 1.01-.41.268-.263.419-.619.419-.99V6.8c0-.371-.15-.727-.418-.99a1.444 1.444 0 00-1.01-.41h-9.198c-.334 0-.657-.115-.914-.324z'
      fill='#0072f5'
      stroke='rgba(255, 255, 255, 0.10)'
      strokeWidth='0.5'
    ></path>
  </svg>
);

const UploadFileIcon: React.FC<{ style?: React.CSSProperties }> = ({
  style,
}) => (
  <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' style={style}>
    <path
      d='M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6z'
      fill='#ffb224'
    ></path>
  </svg>
);

const Upload: React.FC = () => {
  return (
    <div className='flex w-[800px] flex-col items-center justify-center'>
      <h1 className='text-myTextHighlight mb-[10px] text-[20px]'>
        将文件或文件夹拖到这里
      </h1>
      <p className='text-darkTextColor mb-[16px] text-[14px]'>或者</p>
      <div className='flex gap-[16px]'>
        <div className='border-myUploadBorderColor bg-myUploadBgColor hover:bg-myUploadTextHoverColor relative flex h-[140px] w-[200px] cursor-pointer justify-center rounded-lg border'>
          <p className='text-myUploadTextColor mt-[25px] text-[16px]'>
            上传文件
          </p>
          <CreateIcon
            style={{
              position: 'absolute',
              bottom: '-1px',
              right: '20px',
              width: '60px',
              height: '60px',
            }}
          />
        </div>
        <div className='border-myUploadBorderColor bg-myUploadBgColor hover:bg-myUploadTextHoverColor relative flex h-[140px] w-[200px] cursor-pointer justify-center rounded-lg border'>
          <p className='text-myUploadTextColor mt-[25px] text-[16px]'>
            上传文件
          </p>
          <UploadFileIcon
            style={{
              position: 'absolute',
              bottom: '-1px',
              right: '20px',
              width: '60px',
              height: '60px',
            }}
          />
        </div>
        <div className='border-myUploadBorderColor bg-myUploadBgColor hover:bg-myUploadTextHoverColor relative flex h-[140px] w-[200px] cursor-pointer justify-center rounded-lg border'>
          <p className='text-myUploadTextColor mt-[25px] text-[16px]'>
            上传文件
          </p>
          <UploadFolderIcon
            style={{
              position: 'absolute',
              bottom: '-1px',
              right: '20px',
              width: '60px',
              height: '60px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Upload;
