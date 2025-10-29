import React from 'react';
import { useDocuments } from '@/hooks/useDocment';
import Document from './Document';

// 容器组件：负责数据获取和状态管理
const DocumentList: React.FC = () => {
  const { Document: documents, selectedDocumentIds, toggleDocumentSelection } = useDocuments();

  return (
    <div className='grid grid-cols-3 gap-4 lg:grid-cols-4 xl:grid-cols-5'>
      {documents.map(document => (
        <Document
          key={document.id}
          {...document}
          isSelected={selectedDocumentIds.has(document.id)}
          onToggle={() => toggleDocumentSelection(document.id)}
        />
      ))}
    </div>
  );
};

export default DocumentList;

