import { create } from 'zustand';
import { getAllFolder } from '@/services/File';
import type { FolderItem } from '@/services/File/types/folder';

// 定义 store 状态类型
interface FileStore {
  // 状态
  folders: FolderItem[];
  loading: boolean;
  error: string | null;

  // 操作
  fetchFolders: () => Promise<void>;
  // setFolders: (folders: FolderItem[]) => void;
  // addFolder: (folder: FolderItem) => void;
  // updateFolder: (id: string, updates: Partial<FolderItem>) => void;
  // deleteFolder: (id: string) => void;
  // clearError: () => void;
}

// 创建 store
export const useFileStore = create<FileStore>((set, get) => ({
  // 初始状态
  folders: [],
  loading: false,
  error: null,

  // 获取文件夹列表
  fetchFolders: async () => {
    set({ loading: true, error: null });

    try {
      const { data, code, message } = await getAllFolder();
      console.log('await', data);
      // const data = await getAllFolder();
      // 处理业务逻辑错误
      if (code !== 200) {
        throw new Error(message);
      }
      set({ folders: data.folders as FolderItem[] });
    } catch (error: any) {
      // 这里捕获的是业务错误
      set({ error: error.message });
      // 不在这里弹窗，让组件决定如何展示
    } finally {
      set({ loading: false });
    }
  },

  // // 设置文件夹列表
  // setFolders: folders => set({ folders }),

  // // 添加文件夹
  // addFolder: folder =>
  //   set(state => ({
  //     folders: [...state.folders, folder],
  //   })),

  // // 更新文件夹
  // updateFolder: (id, updates) =>
  //   set(state => ({
  //     folders: state.folders.map(folder =>
  //       folder.id === id ? { ...folder, ...updates } : folder
  //     ),
  //   })),

  // // 删除文件夹
  // deleteFolder: id =>
  //   set(state => ({
  //     folders: state.folders.filter(folder => folder.id !== id),
  //   })),

  // 清除错误
  clearError: () => set({ error: null }),
}));
