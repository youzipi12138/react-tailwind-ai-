import { create } from 'zustand';
import {
  getAllFolder,
  createFolder as createFolderApi,
  deleteFolder as deleteFolderApi,
} from '@/services/File';
import type {
  FolderItem,
  CreateFolderParams,
} from '@/services/File/types/folder';
import { showError, showSuccess } from '@/utils/notification';

// 定义 store 状态类型
interface FileStore {
  // 状态
  folders: FolderItem[];
  loading: boolean; // 获取列表的加载状态
  creating: boolean; // 创建文件夹的加载状态
  error: string | null;

  // 操作
  fetchFolders: () => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  createFolder: (createFolderParams: CreateFolderParams) => Promise<void>;

  deleteFolder: (id: string) => Promise<void>;
  // 1. () - 函数参数
  // 表示这个函数不接受任何参数
  // 如果有参数，会写成 (id: string) 或 (data: FolderItem) 等
  // 2. => - 箭头
  // 表示函数的返回值类型
  // 3. Promise<void> - 返回值类型
  // Promise: 表示这是一个异步操作（async 函数）
  // void: 表示函数不返回任何有意义的值

  //   必须使用异步的场景：
  // 在你的项目中：
  // 操作	为什么必须异步
  // getAllFolder()	🌐 网络请求
  // createFolder()	🌐 网络请求
  // deleteFolder()	🌐 网络请求
  // fetch()	🌐 所有 HTTP 请求
  // 文件读写	💾 磁盘 I/O
  // setTimeout()	⏰ 定时器

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
  creating: false,
  error: null,

  // 获取文件夹列表
  fetchFolders: async () => {
    set({ loading: true, error: null });

    try {
      const { data, code, message } = await getAllFolder();
      // 处理业务逻辑错误
      if (code !== 200) {
        throw new Error(message);
      }
      set({ folders: data });
    } catch (error) {
      // 这里捕获的是业务错误
      const errorMessage = error instanceof Error ? error.message : '获取失败';
      set({ error: errorMessage });
      // 不在这里弹窗，让组件决定如何展示
    } finally {
      set({ loading: false });
    }
  },

  // 创建文件夹
  createFolder: async (createFolderParams: CreateFolderParams) => {
    set({ creating: true, error: null });

    try {
      const { code, message } = await createFolderApi(createFolderParams);
      if (code !== 201) {
        throw new Error(message); // 抛出错误 之后  下面的代码就不会在执行力
      }
      // 创建成功后重新获取列表
      await get().fetchFolders();
      showSuccess(message);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '创建失败';
      set({ error: errorMessage });
      showError(errorMessage);
    } finally {
      set({ creating: false });
    }
  },

  // 删除文件夹
  deleteFolder: async (id: string) => {
    try {
      const { code, message } = await deleteFolderApi(id);
      if (code !== 200) {
        throw new Error(message);
      }
      await get().fetchFolders();
      showSuccess(message);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '删除失败';
      set({ error: errorMessage });
      showError(errorMessage);
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
