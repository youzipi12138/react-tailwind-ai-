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
  selectedImageIds: Set<string>; // 选中的图片 ID 集合
  isGrid: boolean;
  isList: boolean;
  // 操作
  fetchImages: () => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  deleteImage: (ids: string[]) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  uploadImage: (file: File) => Promise<void>;
  clearError: () => void;
  // eslint-disable-next-line no-unused-vars
  toggleImageSelection: (id: string) => void; // 切换单个图片选中状态
  toggleSelectAll: () => void; // 切换全选/取消全选
  // eslint-disable-next-line no-unused-vars
  setIsGrid: (isGrid: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  setIsList: (isList: boolean) => void;
}

// 创建 store
export const useImageStore = create<ImageStore>((set, get) => ({
  // 初始状态
  images: [],
  loading: false,
  error: null,
  selectedImageIds: new Set<string>(),
  isGrid: false,
  isList: false,
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
  deleteImage: async (ids: string[]) => {
    try {
      const { code, message } = await deleteImageApi(ids);
      // 处理业务逻辑错误
      if (code !== 200) {
        throw new Error(message);
      }
      await get().fetchImages();
      // 删除成功后清空选中状态
      set({ selectedImageIds: new Set<string>() });
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

  // 切换单个图片的选中状态
  toggleImageSelection: (id: string) => {
    const { selectedImageIds } = get();
    const newSelected = new Set(selectedImageIds);

    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }

    set({ selectedImageIds: newSelected });
  },

  // 切换全选/取消全选
  toggleSelectAll: () => {
    const { images, selectedImageIds } = get();
    const allSelected =
      selectedImageIds.size === images.length && images.length > 0;

    if (allSelected) {
      // 全部选中 → 取消全选
      set({ selectedImageIds: new Set<string>() });
    } else {
      // 部分选中或未选中 → 全选
      set({ selectedImageIds: new Set(images.map(img => img.id)) });
    }
  },

  setIsGrid: (isGrid: boolean) => set({ isGrid }),
  setIsList: (isList: boolean) => set({ isList }),
}));
