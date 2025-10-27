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
export interface DeleteFolderParams {
  id: string;
}

//请求参数的类型

// 场景	推荐方式	原因
// 参数会复用	✅ 单独定义类型	多处使用，统一管理
// 参数简单且只用一次	✅ 直接写在括号里	减少代码量
// 参数复杂（3+字段）	✅ 单独定义类型	可读性更好
// 需要在Form中使用	✅ 单独定义类型	Form需要引用类型
