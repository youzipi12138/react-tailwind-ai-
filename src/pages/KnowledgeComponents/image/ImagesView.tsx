import React, { useCallback, useMemo } from 'react';
import { useImages } from '@/hooks/useImages';
import KnowledgeHeader from '../../components/KnowledgeHeader';
import ImageList from './index';
import ImageTable from './ImageTable';
import Upload from '../../components/Upload';

const ImagesView: React.FC = () => {
  const {
    images,
    imageCount,
    selectedCount,
    isAllSelected,
    isIndeterminate,
    selectedImageIds,
    isGrid,
    deleteImage,
    toggleSelectAll,
    toggleImageSelection,
    setIsGrid,
  } = useImages();

  // 使用 useCallback 缓存回调函数，避免每次渲染都创建新的函数引用
  const handleToggleImage = useCallback(
    (imageId: string) => {
      toggleImageSelection(imageId);
    },
    [toggleImageSelection]
  );

  // 缓存 selectedImageIds 数组，避免每次都转换
  const selectedImageIdsArray = useMemo(
    () => Array.from(selectedImageIds),
    [selectedImageIds]
  );

  return (
    <div className='h-full'>
      {imageCount > 0 && (
        <KnowledgeHeader
          imageCount={imageCount}
          selectedCount={selectedCount}
          isAllSelected={isAllSelected}
          isIndeterminate={isIndeterminate}
          selectedImageIds={selectedImageIdsArray}
          deleteImage={deleteImage}
          toggleSelectAll={toggleSelectAll}
          setIsGrid={setIsGrid}
          isGrid={isGrid}
        />
      )}
      <div className='flex h-full justify-center overflow-y-auto p-6'>
        {imageCount > 0 ? (
          isGrid ? (
            <ImageList
              images={images}
              selectedImageIds={selectedImageIds}
              onToggleImage={handleToggleImage}
            />
          ) : (
            <ImageTable
              images={images}
              selectedImageIds={selectedImageIds}
              toggleImageSelection={handleToggleImage}
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

export default ImagesView;
