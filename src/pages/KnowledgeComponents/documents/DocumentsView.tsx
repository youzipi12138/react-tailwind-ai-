import React, { useCallback, useMemo } from 'react';
import { useDocuments } from '@/hooks/useDocments';
import KnowledgeHeader from '../../components/KnowledgeHeader';
import DocumentList from './DocumentList';
import DocumentTable from './DocumentTable';
import Upload from '../../components/Upload';

const DocumentsView: React.FC = () => {
  const {
    Document: documents,
    documentCount,
    selectedCount,
    isAllSelected,
    isIndeterminate,
    selectedDocumentIds,
    isGrid,
    deleteDocument,
    toggleSelectAll,
    toggleDocumentSelection,
    setIsGrid,
  } = useDocuments();

  // 使用 useCallback 缓存回调函数
  const handleToggleDocument = useCallback(
    (documentId: string) => {
      toggleDocumentSelection(documentId);
    },
    [toggleDocumentSelection]
  );

  // 缓存数组转换
  const selectedDocumentIdsArray = useMemo(
    () => Array.from(selectedDocumentIds),
    [selectedDocumentIds]
  );

  return (
    <div className=''>
      {documentCount > 0 && (
        <KnowledgeHeader
          imageCount={documentCount}
          selectedCount={selectedCount}
          isAllSelected={isAllSelected}
          isIndeterminate={isIndeterminate}
          selectedImageIds={selectedDocumentIdsArray}
          deleteImage={deleteDocument}
          toggleSelectAll={toggleSelectAll}
          setIsGrid={setIsGrid}
          isGrid={isGrid}
        />
      )}
      <div className='flex h-full justify-center overflow-y-auto p-6'>
        {documentCount > 0 ? (
          isGrid ? (
            <DocumentList
              documents={documents}
              selectedDocumentIds={selectedDocumentIds}
              toggleDocumentSelection={handleToggleDocument}
            />
          ) : (
            <DocumentTable
              documents={documents}
              selectedDocumentIds={selectedDocumentIds}
              toggleDocumentSelection={handleToggleDocument}
            />
          )
        ) : (
          <div className='mt-[200px]'>
            <Upload />
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsView;
