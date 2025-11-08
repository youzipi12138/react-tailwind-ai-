import { create } from 'zustand';
import {
  getImageList,
  deleteImage as deleteImageApi,
  uploadImage as uploadImageApi,
} from '@/services/images';
import { showError, showSuccess } from '@/utils/notification';
import type { ImageItem } from '@/services/images/types';

// 定义 store 状态类型
interface ImageStore {
  // 状态
  images: ImageItem[];
  loading: boolean; // 获取列表的加载状态
  loadingMore: boolean; // 加载更多状态
  error: string | null;
  selectedImageIds: Set<string>; // 选中的图片 ID 集合
  isGrid: boolean;
  isList: boolean;
  offset: number;
  limit: number;
  hasMore: boolean;
  progress: number;
  // 操作
  fetchImages: () => Promise<void>;
  loadMore: () => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  deleteImage: (ids: string[]) => Promise<void>;
  uploadImage: (
    // eslint-disable-next-line no-unused-vars
    file: File,
    // eslint-disable-next-line no-unused-vars
    options?: {
      // eslint-disable-next-line no-unused-vars
      onProgress?: (percent: number) => void;
    }
  ) => Promise<void>;
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
  loadingMore: false,
  error: null,
  selectedImageIds: new Set<string>(),
  isGrid: false,
  isList: false,
  offset: 0,
  limit: 20,
  hasMore: true,
  progress: 0,
  // 首次/刷新获取图片列表（重置 offset）
  fetchImages: async () => {
    set({ loading: true, error: null, offset: 0, hasMore: true });

    try {
      const { data, code, message } = await getImageList({
        offset: 0,
        limit: get().limit,
      });
      if (code !== 200) {
        throw new Error(message);
      }
      const nextOffset = data.length;
      const hasMore = data.length >= get().limit;
      set({ images: data, loading: false, offset: nextOffset, hasMore });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '获取失败';
      set({ error: errorMessage, loading: false });
      showError(errorMessage);
    }
  },

  // 加载更多（分页追加）
  loadMore: async () => {
    const { loading, loadingMore, hasMore, offset, limit, images } = get();
    if (loading || loadingMore || !hasMore) return;
    set({ loadingMore: true });
    try {
      const { data, code, message } = await getImageList({ offset, limit });
      if (code !== 200) {
        throw new Error(message);
      }
      const appended = [...images, ...data];
      const nextOffset = offset + data.length;
      const stillHasMore = data.length >= limit;
      set({
        images: appended,
        offset: nextOffset,
        hasMore: stillHasMore,
        loadingMore: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '加载更多失败';
      set({
        error: errorMessage,
        loadingMore: false,
      });
      showError(errorMessage);
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
      showSuccess(message);
      // 删除成功后清空选中状态
      set({ selectedImageIds: new Set<string>() });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '删除失败';
      set({ error: errorMessage });
      showError(errorMessage);
    }
  },

  // 上传图片
  uploadImage: async (file: File) => {
    try {
      const { code, message } = await uploadImageApi(file, {
        onProgress: (percent: number) => {
          set({ progress: percent });
        },
      });
      // 处理业务逻辑错误
      if (code !== 201) {
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
