import React from 'react';
import { useFolders } from '@/hooks/useFolders';
import Empty from './Empty';
import Menu from './Menu';

const AckBaseBody: React.FC = () => {
  const { folders, loading, isEmpty, deleteFolder } = useFolders();

  if (isEmpty) {
    return <Empty />;
  } else {
    return (
      <div>
        <Menu folders={folders} onDelete={deleteFolder}></Menu>
      </div>
    );
  }
};

export default AckBaseBody;
