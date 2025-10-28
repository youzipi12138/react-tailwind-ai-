import { useEffect } from 'react';
import { useImageStore } from '@/store/images';

export const useImages = () => {
  const {
    images,
    loading,
    error,
    fetchImages,
    clearError,
    deleteImage,
    uploadImage,
  } = useImageStore();

  useEffect(() => {
    fetchImages();
  }, []);

  return {
    images,
    loading,
    error,
    fetchImages,
    clearError,
    deleteImage,
    uploadImage,
  };
};
