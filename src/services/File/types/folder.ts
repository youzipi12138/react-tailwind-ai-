// 文件夹相关类型定义

export interface FolderItem {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  // 根据实际 API 返回结构调整
}

export interface CreateFolderParams {
  name: string;
  description: string;
}

// API 响应类型
export interface GetAllFolderResponse {
  folders: FolderItem[];
}
