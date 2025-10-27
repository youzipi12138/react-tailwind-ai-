# 文件夹数据管理方案

## 概述

本项目采用 **Zustand + 自定义 Hook** 的方案来管理文件夹数据，提供了完整的状态管理、错误处理和用户体验优化。

## 架构设计

```
src/
├── services/File/           # API 接口层
│   └── index.tsx           # 文件夹相关 API
├── store/File/             # 状态管理层
│   └── index.ts            # Zustand store
├── hooks/                  # 自定义 Hook 层
│   └── useFolders.ts       # 文件夹数据 Hook
└── components/             # 组件层
    └── FolderList.tsx      # 文件夹列表组件
```

## 使用方式

### 1. 在组件中使用（推荐）

```tsx
import React from 'react';
import { useFolders } from '@/hooks/useFolders';

const MyComponent: React.FC = () => {
  const {
    folders, // 文件夹列表
    loading, // 加载状态
    error, // 错误信息
    refresh, // 刷新方法
    isEmpty, // 是否为空
    hasError, // 是否有错误
  } = useFolders();

  if (loading) return <div>加载中...</div>;
  if (hasError) return <div>错误: {error}</div>;
  if (isEmpty) return <div>暂无数据</div>;

  return (
    <div>
      {folders.map(folder => (
        <div key={folder.id}>{folder.name}</div>
      ))}
    </div>
  );
};
```

### 2. 直接使用 Store（高级用法）

```tsx
import { useFileStore } from '@/store/File';

const MyComponent: React.FC = () => {
  const { folders, fetchFolders, addFolder } = useFileStore();

  // 手动控制数据获取
  const handleRefresh = () => {
    fetchFolders();
  };

  return (
    <div>
      <button onClick={handleRefresh}>刷新</button>
      {/* 渲染逻辑 */}
    </div>
  );
};
```

## 主要特性

### 1. 自动数据加载

- 组件挂载时自动获取数据
- 避免重复请求
- 支持手动刷新

### 2. 完整的状态管理

- 加载状态 (`loading`)
- 错误状态 (`error`)
- 数据状态 (`folders`)

### 3. 便捷的操作方法

- `refresh()` - 刷新数据
- `addFolder()` - 添加文件夹
- `updateFolder()` - 更新文件夹
- `deleteFolder()` - 删除文件夹
- `clearError()` - 清除错误

### 4. 类型安全

- 完整的 TypeScript 类型定义
- 编译时类型检查
- 智能代码提示

## 最佳实践

### 1. 优先使用 Hook

```tsx
// ✅ 推荐：使用自定义 Hook
const { folders, loading, refresh } = useFolders();

// ❌ 不推荐：直接使用 Store
const { folders, loading, fetchFolders } = useFileStore();
```

### 2. 错误处理

```tsx
const { folders, error, hasError, clearError } = useFolders();

if (hasError) {
  return (
    <Alert
      message='加载失败'
      description={error}
      action={<Button onClick={clearError}>重试</Button>}
    />
  );
}
```

### 3. 加载状态

```tsx
const { folders, loading, isEmpty } = useFolders();

if (loading) {
  return <Spin size='large' />;
}

if (isEmpty) {
  return <Empty description='暂无数据' />;
}
```

## 扩展功能

### 添加新的 API 方法

1. 在 `services/File/index.tsx` 中添加新的 API 方法
2. 在 `store/File/index.ts` 中添加对应的状态和操作
3. 在 `hooks/useFolders.ts` 中暴露新的方法

### 添加新的数据类型

1. 更新 `FolderItem` 接口
2. 更新 Store 中的类型定义
3. 更新组件中的使用方式

## 注意事项

1. **API 响应格式**：请根据实际后端 API 调整 `FolderItem` 接口
2. **错误处理**：建议在组件中添加适当的错误边界
3. **性能优化**：大量数据时考虑分页或虚拟滚动
4. **缓存策略**：当前实现会缓存数据，需要刷新时调用 `refresh()` 方法
