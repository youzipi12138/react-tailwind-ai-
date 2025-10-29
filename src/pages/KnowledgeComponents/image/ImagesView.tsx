import React from 'react';
import { useImages } from '@/hooks/useImages';
import KnowledgeHeader from '../../components/KnowledgeHeader';
import ImageList from './index';
import ImageTable from './ImageTable';
import Upload from '../../components/Upload';

const ImagesView: React.FC = () => {
  const {
    imageCount,
    selectedCount,
    isAllSelected,
    isIndeterminate,
    selectedImageIds,
    isGrid,
    deleteImage,
    toggleSelectAll,
    setIsGrid,
  } = useImages();

  return (
    <div className='h-full'>
      {imageCount > 0 && (
        <KnowledgeHeader
          imageCount={imageCount}
          selectedCount={selectedCount}
          isAllSelected={isAllSelected}
          isIndeterminate={isIndeterminate}
          selectedImageIds={Array.from(selectedImageIds)}
          deleteImage={deleteImage}
          toggleSelectAll={toggleSelectAll}
          setIsGrid={setIsGrid}
          isGrid={isGrid}
        />
      )}
      <div className='flex h-full justify-center overflow-y-auto p-6'>
        {imageCount > 0 ? (
          isGrid ? (
            <ImageList />
          ) : (
            <ImageTable />
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

export default ImagesView;
