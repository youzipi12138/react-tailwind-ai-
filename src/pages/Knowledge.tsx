import React from 'react';
import FolderList from '@/components/FolderList';

const Knowledge: React.FC = () => {
  return (
    <div className='p-6'>
      <h1 className='mb-4 text-2xl font-bold text-white'>知识库</h1>
      <p className='mb-6 text-gray-300'>管理你的知识文件夹</p>

      {/* 使用文件夹列表组件 */}
      <FolderList />
    </div>
  );
};

export default Knowledge;
