import { create } from 'zustand';
import {
  getImageList,
  deleteImage as deleteImageApi,
  uploadImage as uploadImageApi,
} from '@/services/images';
import type { ImageItem } from '@/services/images/types';

// 定义 store 状态类型
interface ImageStore {
  // 状态
  images: ImageItem[];
  loading: boolean; // 获取列表的加载状态
  error: string | null;

  // 操作
  fetchImages: () => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  deleteImage: (id: string) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  uploadImage: (file: File) => Promise<void>;
  clearError: () => void;
}

// 创建 store
export const useImageStore = create<ImageStore>((set, get) => ({
  // 初始状态
  images: [],
  loading: false,
  error: null,

  // 获取图片列表
  fetchImages: async () => {
    set({ loading: true, error: null });

    try {
      const { data, code, message } = await getImageList();
      // 处理业务逻辑错误
      if (code !== 200) {
        throw new Error(message);
      }
      set({ images: data });
    } catch (error) {
      // 这里捕获的是业务错误
      const errorMessage = error instanceof Error ? error.message : '获取失败';
      set({ error: errorMessage });
      // 不在这里弹窗，让组件决定如何展示
    } finally {
      set({ loading: false });
    }
  },

  // 删除图片
  deleteImage: async (id: string) => {
    try {
      const { code, message } = await deleteImageApi(id);
      // 处理业务逻辑错误
      if (code !== 200) {
        throw new Error(message);
      }
      await get().fetchImages();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '删除失败';
      set({ error: errorMessage });
      throw error;
    }
  },

  // 上传图片
  uploadImage: async (file: File) => {
    try {
      const { code, message } = await uploadImageApi(file);
      // 处理业务逻辑错误
      if (code !== 200) {
        throw new Error(message);
      }
      await get().fetchImages();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '上传失败';
      set({ error: errorMessage });
      throw error;
    }
  },

  // 清除错误
  clearError: () => set({ error: null }),
}));
