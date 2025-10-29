import React from 'react';
import { App } from 'antd';
import { setMessageInstance, setNotificationInstance } from './messageInstance';

// AppProvider 组件，用于初始化全局实例
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { message, notification } = App.useApp();

  // 在组件挂载时设置全局实例
  React.useEffect(() => {
    setMessageInstance(message);
    setNotificationInstance(notification);
  }, [message, notification]);

  return <>{children}</>;
};
