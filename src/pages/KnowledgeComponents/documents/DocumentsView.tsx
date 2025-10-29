import React from 'react';
import { useDocuments } from '@/hooks/useDocment';
import KnowledgeHeader from '../../components/KnowledgeHeader';
import DocumentList from './DocumentList';
import DocumentTable from './DocumentTable';
import Upload from '../../components/Upload';

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
      <div className='flex h-full justify-center overflow-y-auto p-6'>
        {documentCount > 0 ? (
          isGrid ? (
            <DocumentList />
          ) : (
            <DocumentTable />
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
