import { get, Delete } from '@/services/index';
import type { DocumentItem } from './types';
import Result from '../Result';

// 获取所有文档
export const getDocumentList: () => Promise<Result<DocumentItem[]>> = () => {
  return get('/documents');
};

// 删除文档
export const deleteDocument: (ids: string[]) => Promise<Result<void>> = ids => {
  return Delete(`/documents/batch`, ids);
};
