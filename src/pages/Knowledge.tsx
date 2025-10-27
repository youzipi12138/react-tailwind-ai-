import React from 'react';
import FolderList from '@/components/FolderList';

const Knowledge: React.FC = () => {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold text-white mb-4'>知识库</h1>
      <p className='text-gray-300 mb-6'>管理你的知识文件夹</p>
      
      {/* 使用文件夹列表组件 */}
      <FolderList />
    </div>
  );
};

export default Knowledge;
