import { get, request } from '@/services/index';
import Result from '../Result';
import type { FolderItem } from '@/services/File/types/folder';

// 获取所有文件夹
export const getAllFolder: () => Promise<Result<FolderItem>> = () => {
  return get('/folders');
};

// 获取单个文件夹详情
export const getFolderById = (id: string) => {
  return get(`/upload/${id}`);
};

// 创建文件夹
export const createFolder = (data: { name: string; path: string }) => {
  return get('/upload', data);
};

// 更新文件夹
export const updateFolder = (id: string, data: Partial<FolderItem>) => {
  return get(`/upload/${id}`, data);
};

// 删除文件夹
export const deleteFolder = (id: string) => {
  return request({
    url: `/upload/${id}`,
    method: 'delete',
  });
};
