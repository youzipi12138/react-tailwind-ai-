import React from 'react';
import Document from './Document';
import type { DocumentItem } from '@/services/Documents/types';

interface DocumentListProps {
  documents: DocumentItem[];
  selectedDocumentIds: Set<string>;
  toggleDocumentSelection: (id: string) => void;
}

// 展示组件：只负责渲染，数据通过 props 传入
const DocumentList: React.FC<DocumentListProps> = React.memo(
  ({ documents, selectedDocumentIds, toggleDocumentSelection }) => {
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
  },
  (prevProps, nextProps) => {
    return (
      prevProps.documents === nextProps.documents &&
      prevProps.selectedDocumentIds === nextProps.selectedDocumentIds &&
      prevProps.toggleDocumentSelection === nextProps.toggleDocumentSelection
    );
  }
);

DocumentList.displayName = 'DocumentList';

export default DocumentList;
