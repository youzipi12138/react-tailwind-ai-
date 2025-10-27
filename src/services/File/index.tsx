import { get, post, Delete } from '@/services/index';
import Result from '../Result';
import type {
  FolderItem,
  CreateFolderParams,
} from '@/services/File/types/folder';

// 获取所有文件夹
export const getAllFolder: () => Promise<Result<FolderItem[]>> = () => {
  return get('/folders');
};

// 获取单个文件夹详情
export const getFolderById = (id: string) => {
  return get(`/upload/${id}`);
};

// 创建文件夹
export const createFolder = (data: CreateFolderParams) => {
  return post('/folders', data);
};

// 删除文件夹
export const deleteFolder = (id: string) => {
  return Delete(`/folders/${id}`);
};
// 更新文件夹
export const updateFolder = (id: string, data: Partial<FolderItem>) => {
  return get(`/upload/${id}`, data);
};
