import { create } from 'zustand';
import { getDocumentList, deleteDocument } from '@/services/Documents';
import type { DocumentItem } from '@/services/Documents/types';

// 定义 store 状态类型
interface DocumentStore {
  // 状态
  Document: DocumentItem[];
  loading: boolean; // 获取列表的加载状态
  error: string | null;
  selectedDocumentIds: Set<string>; // 选中的文档 ID 集合
  isGrid: boolean;
  isList: boolean;
  // 操作
  fetchDocuments: () => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  deleteDocument: (ids: string[]) => Promise<void>;
  clearError: () => void;
  // eslint-disable-next-line no-unused-vars
  toggleDocumentSelection: (id: string) => void; // 切换单个文档选中状态
  toggleSelectAll: () => void; // 切换全选/取消全选
  // eslint-disable-next-line no-unused-vars
  setIsGrid: (isGrid: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  setIsList: (isList: boolean) => void;
}

// 创建 store
export const useDocumentStore = create<DocumentStore>((set, get) => ({
  // 初始状态
  Document: [],
  loading: false,
  error: null,
  selectedDocumentIds: new Set<string>(),
  isGrid: false,
  isList: false,
  // 获取文档列表
  fetchDocuments: async () => {
    set({ loading: true, error: null });

    try {
      const { data, code, message } = await getDocumentList();
      // 处理业务逻辑错误
      if (code !== 200) {
        throw new Error(message);
      }
      set({ Document: data });
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
  deleteDocument: async (ids: string[]) => {
    try {
      const { code, message } = await deleteDocument(ids);
      // 处理业务逻辑错误
      if (code !== 200) {
        throw new Error(message);
      }
      await get().fetchDocuments();
      // 删除成功后清空选中状态
      set({ selectedDocumentIds: new Set<string>() });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '删除失败';
      set({ error: errorMessage });
      throw error;
    }
  },

  // 清除错误
  clearError: () => set({ error: null }),

  // 切换单个文档的选中状态
  toggleDocumentSelection: (id: string) => {
    const { selectedDocumentIds } = get();
    const newSelected = new Set(selectedDocumentIds);

    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }

    set({ selectedDocumentIds: newSelected });
  },

  // 切换全选/取消全选
  toggleSelectAll: () => {
    const { Document, selectedDocumentIds } = get();
    const allSelected =
      selectedDocumentIds.size === Document.length && Document.length > 0;

    if (allSelected) {
      // 全部选中 → 取消全选
      set({ selectedDocumentIds: new Set<string>() });
    } else {
      // 部分选中或未选中 → 全选
      set({ selectedDocumentIds: new Set(Document.map(doc => doc.id)) });
    }
  },

  setIsGrid: (isGrid: boolean) => set({ isGrid }),
  setIsList: (isList: boolean) => set({ isList }),
}));
