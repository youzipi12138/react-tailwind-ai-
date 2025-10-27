import React from 'react';
import { useFolders } from '@/hooks/useFolders';
import Empty from './Empty';
import Menu from './Menu';

const AckBaseBody: React.FC = () => {
  const { folders, loading, error, isEmpty } = useFolders();

  if (loading) {
    return <div>正在加载</div>;
  }

  if (isEmpty) {
    return <Empty />;
  } else {
    return (
      <div>
        <Menu folders={folders}></Menu>
      </div>
    );
  }
};

export default AckBaseBody;
