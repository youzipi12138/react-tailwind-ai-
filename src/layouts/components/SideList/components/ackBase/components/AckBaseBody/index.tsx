import React from 'react';
import { useFolders } from '@/hooks/useFolders';
import Empty from './Empty';
import Menu from './Menu';

const AckBaseBody: React.FC = () => {
  const { folders, loading, isEmpty, deleteFolder } = useFolders();

  // ✅ 只在首次加载且无数据时才显示loading
  const showLoading = loading && folders.length === 0;

  if (showLoading) {
    return <div>正在加载...</div>;
  }

  if (isEmpty) {
    return <Empty />;
  }

  // ✅ 关键：组件始终保持挂载，不会因为刷新而卸载
  return (
    <div>
      <Menu folders={folders} onDelete={deleteFolder}></Menu>
    </div>
  );
};

export default AckBaseBody;
