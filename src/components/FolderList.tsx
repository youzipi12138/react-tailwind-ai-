import React from 'react';
import { useFolders } from '@/hooks/useFolders';
import { Button, List, Spin, Alert, Empty } from 'antd';
import { FolderOutlined, ReloadOutlined } from '@ant-design/icons';

/**
 * 文件夹列表组件示例
 * 展示如何在组件中使用文件夹数据
 */
const FolderList: React.FC = () => {
  const {
    folders,
    loading,
    error,
    refresh,
    clearError,
    isEmpty,
    hasError,
  } = useFolders();

  // 处理刷新
  const handleRefresh = () => {
    clearError();
    refresh();
  };

  // 处理文件夹点击
  const handleFolderClick = (folderId: string) => {
    console.log('点击文件夹:', folderId);
    // 这里可以添加导航逻辑
  };

  if (hasError) {
    return (
      <Alert
        message="加载失败"
        description={error}
        type="error"
        showIcon
        action={
          <Button size="small" onClick={handleRefresh}>
            重试
          </Button>
        }
      />
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Spin size="large" />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="暂无文件夹"
        action={
          <Button type="primary" onClick={handleRefresh}>
            刷新
          </Button>
        }
      />
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">文件夹列表</h3>
        <Button
          icon={<ReloadOutlined />}
          onClick={handleRefresh}
          loading={loading}
        >
          刷新
        </Button>
      </div>
      
      <List
        dataSource={folders}
        renderItem={(folder) => (
          <List.Item
            key={folder.id}
            className="cursor-pointer hover:bg-gray-50 rounded p-2"
            onClick={() => handleFolderClick(folder.id)}
          >
            <List.Item.Meta
              avatar={<FolderOutlined className="text-blue-500" />}
              title={folder.name}
              description={folder.path}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default FolderList;
