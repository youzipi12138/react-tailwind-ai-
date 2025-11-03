import React, { useCallback, useMemo, useEffect, useRef } from 'react';
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
    hasMore,
    loading,
    loadingMore,
    deleteImage,
    toggleSelectAll,
    toggleImageSelection,
    setIsGrid,
    loadMore,
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

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const sentinel = sentinelRef.current;
    if (!container || !sentinel) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !loading && !loadingMore) {
          loadMore();
        }
      },
      { root: container, rootMargin: '0px', threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loading, loadingMore, loadMore]);

  return (
    <div className='flex h-full flex-col overflow-hidden'>
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
      <div className='min-h-0 flex-1 overflow-y-auto' ref={scrollContainerRef}>
        {imageCount > 0 ? (
          isGrid ? (
            <div className='w-full'>
              <ImageList
                images={images}
                selectedImageIds={selectedImageIds}
                onToggleImage={handleToggleImage}
              />
              <div ref={sentinelRef} className='h-8 w-full' />
              <div className='py-4 text-center text-sm text-gray-400'>
                {loadingMore ? '加载中…' : hasMore ? '' : '没有更多了'}
              </div>
            </div>
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
