import type { MessageInstance } from 'antd/es/message/interface';
import type { NotificationInstance } from 'antd/es/notification/interface';

// 创建全局变量来存储 message 和 notification 实例
let messageInstance: MessageInstance;
let notificationInstance: NotificationInstance;

// 设置实例的函数
export const setMessageInstance = (instance: MessageInstance) => {
  messageInstance = instance;
};

export const setNotificationInstance = (instance: NotificationInstance) => {
  notificationInstance = instance;
};

// 获取实例的函数
export const getMessageInstance = () => messageInstance;
export const getNotificationInstance = () => notificationInstance;
