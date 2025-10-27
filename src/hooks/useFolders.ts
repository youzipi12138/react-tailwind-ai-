import { useEffect } from 'react';
import { useFileStore } from '@/store/File';

/**
 * 自定义 hook 用于管理文件夹数据
 * 提供自动加载、状态管理和便捷的操作方法
 */
export const useFolders = () => {
  const { folders, loading, error, fetchFolders } = useFileStore();

  // 组件挂载时自动获取数据  //useEffect 是异步函数，console.log()是同步的
  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);

  return {
    // 数据
    folders,
    loading,
    error,

    // 操作方法
    refresh: fetchFolders,

    // 计算属性
    isEmpty: folders.length === 0,
  };
};

/**
 * 仅获取文件夹数据，不自动加载
 * 适用于需要手动控制加载时机的场景
 */
export const useFoldersData = () => {
  const { folders, loading, error } = useFileStore();

  return {
    folders,
    loading,
    error,
    isEmpty: folders.length === 0,
    hasError: !!error,
  };
};
