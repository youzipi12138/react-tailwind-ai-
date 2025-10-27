// 文件夹相关类型定义

export interface FolderItem {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  // 根据实际 API 返回结构调整
}

// 创建文件夹的参数类型
// export interface CreateFolderParams {
//   name: string;
//   path: string;
// }
