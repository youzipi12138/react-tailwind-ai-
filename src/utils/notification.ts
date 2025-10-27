import { message, notification } from 'antd';

// 消息提示类型
export type MessageType = 'success' | 'error' | 'warning' | 'info';

// 基础消息提示
export const showMessage = (
  type: MessageType,
  content: string,
  duration = 3
) => {
  message[type]({
    content,
    duration,
    style: {
      marginTop: '20px',
    },
  });
};

// 成功提示
export const showSuccess = (content: string, duration = 3) => {
  showMessage('success', content, duration);
};

// 错误提示
export const showError = (content: string, duration = 4) => {
  showMessage('error', content, duration);
};

// 警告提示
export const showWarning = (content: string, duration = 3) => {
  showMessage('warning', content, duration);
};

// 信息提示
export const showInfo = (content: string, duration = 3) => {
  showMessage('info', content, duration);
};

// 通知框（更复杂的提示）
export const showNotification = (
  type: MessageType,
  title: string,
  description: string,
  duration = 4.5
) => {
  notification[type]({
    message: title,
    description,
    duration,
    placement: 'topRight',
  });
};

// 网络错误处理
export const handleNetworkError = (error: unknown) => {
  let errorMessage = '网络错误，请稍后重试';

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  showError(errorMessage);
};

// API 错误处理
export const handleApiError = (error: any) => {
  let errorMessage = '请求失败';

  if (error?.message) {
    errorMessage = error.message;
  } else if (error?.response?.data?.message) {
    errorMessage = error.response.data.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  showError(errorMessage);
};
