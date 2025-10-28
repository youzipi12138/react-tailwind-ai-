import { useEffect } from 'react';
import { useImageStore } from '@/store/images';

export const useImages = () => {
  const {
    images,
    loading,
    error,
    selectedImageIds,
    fetchImages,
    clearError,
    deleteImage,
    uploadImage,
    toggleImageSelection,
    toggleSelectAll,
    setIsGrid,
    setIsList,
  } = useImageStore();

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
    error,
    selectedImageIds,
    isAllSelected,
    isIndeterminate,
    fetchImages,
    clearError,
    deleteImage,
    uploadImage,
    toggleImageSelection,
    toggleSelectAll,
    setIsGrid,
    setIsList,
  };
};
