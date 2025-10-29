// 格式化文件大小
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

// 格式化时间：支持时间戳和 ISO 8601 字符串（2025-10-28T15:33:46.859Z）
// 根据现在的时间，返回几天前，几小时前，几分钟前，几秒前
export const formatTime = (time: number | string): string => {
  const timestamp = typeof time === 'string' ? new Date(time).getTime() : time;
  const now = new Date().getTime();
  const diff = now - timestamp;

  if (diff < 0) return '刚刚'; // 未来时间
  if (diff < 1000) return '刚刚';
  if (diff < 1000 * 60) return Math.floor(diff / 1000) + '秒前';
  if (diff < 1000 * 60 * 60) return Math.floor(diff / (1000 * 60)) + '分钟前';
  if (diff < 1000 * 60 * 60 * 24)
    return Math.floor(diff / (1000 * 60 * 60)) + '小时前';
  if (diff < 1000 * 60 * 60 * 24 * 30)
    return Math.floor(diff / (1000 * 60 * 60 * 24)) + '天前';
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 30)) + '月前';
};
