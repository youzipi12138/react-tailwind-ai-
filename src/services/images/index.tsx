import { get, Delete, upload } from '@/services/index';
import type { ImageItem } from './types/index';
import Result from '../Result';

export const getImageList: () => Promise<Result<ImageItem[]>> = () => {
  return get('/images');
};

export const deleteImage = (id: string): Promise<Result<void>> => {
  return Delete(`/images/${id}`);
};

/**
 * 上传图片
 * @param file 文件对象
 * @param options 上传选项
 * @returns Promise
 */
export const uploadImage = (
  file: File,
  options?: {
    // eslint-disable-next-line no-unused-vars
    onProgress?: (percent: number) => void;
    category?: string;
    folder?: string;
  }
): Promise<Result<ImageItem>> => {
  // 调用通用的 upload 方法
  return upload<ImageItem>({
    url: '/upload',
    file,
    onProgress: options?.onProgress,
    data: {
      ...(options?.category && { category: options.category }),
      ...(options?.folder && { folder: options.folder }),
    },
  });
};
