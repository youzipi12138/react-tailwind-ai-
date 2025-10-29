import React from 'react';
import { useDocuments } from '@/hooks/useDocment';
import KnowledgeHeader from '../../components/KnowledgeHeader';

const DocumentsView: React.FC = () => {
  const {
    documentCount,
    selectedCount,
    isAllSelected,
    isIndeterminate,
    selectedDocumentIds,
    isGrid,
    deleteDocument,
    toggleSelectAll,
    setIsGrid,
  } = useDocuments();

  return (
    <div className='h-full'>
      {documentCount > 0 && (
        <KnowledgeHeader
          imageCount={documentCount}
          selectedCount={selectedCount}
          isAllSelected={isAllSelected}
          isIndeterminate={isIndeterminate}
          selectedImageIds={Array.from(selectedDocumentIds)}
          deleteImage={deleteDocument}
          toggleSelectAll={toggleSelectAll}
          setIsGrid={setIsGrid}
          isGrid={isGrid}
        />
      )}
      <div className='p-6'>
        <h2 className='text-lightTextColor mb-4 text-2xl font-bold'>
          文档列表
        </h2>
        <p className='text-darkTextColor'>这里显示所有文档文件</p>
        {/* TODO: 这里可以添加文档列表组件 */}
      </div>
    </div>
  );
};

export default DocumentsView;
