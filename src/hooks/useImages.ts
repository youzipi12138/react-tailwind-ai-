import { useEffect } from 'react';
import { useImageStore } from '@/store/images';

export const useImages = () => {
  const {
    images,
    loading,
    loadingMore,
    error,
    selectedImageIds,
    isGrid,
    fetchImages,
    loadMore,
    clearError,
    deleteImage,
    uploadImage,
    toggleImageSelection,
    toggleSelectAll,
    setIsGrid,
    setIsList,
    hasMore,
  } = useImageStore();

  // 初始化时获取图片列表
  // 注意：严格模式下会执行两次，这是正常的开发行为，生产环境不会有此问题
  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 计算全选状态
  const isAllSelected =
    selectedImageIds.size === images.length && images.length > 0;
  const isIndeterminate =
    selectedImageIds.size > 0 && selectedImageIds.size < images.length;

  return {
    imageCount: images.length,
    selectedCount: selectedImageIds.size,
    images,
    loading,
    loadingMore,
    error,
    selectedImageIds,
    isAllSelected,
    isIndeterminate,
    isGrid,
    fetchImages,
    loadMore,
    hasMore,
    clearError,
    deleteImage,
    uploadImage,
    toggleImageSelection,
    toggleSelectAll,
    setIsGrid,
    setIsList,
  };
};
