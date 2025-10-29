import React from 'react';
import type { DocumentItem } from '@/services/Documents/types';
import { formatFileSize } from '@/utils/format';

// 展示组件：只负责渲染，所有数据通过 props 传入
const Document: React.FC<
  DocumentItem & {
    isSelected: boolean;
    onToggle: () => void;
  }
> = ({ path, filename, size, isSelected, onToggle }) => {
  // 根据文件扩展名返回对应的图标或颜色
  const getFileIcon = () => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const iconMap: Record<string, { icon: string; color: string }> = {
      pdf: { icon: '📄', color: 'bg-red-500' },
      doc: { icon: '📝', color: 'bg-blue-500' },
      docx: { icon: '📝', color: 'bg-blue-500' },
      txt: { icon: '📃', color: 'bg-gray-500' },
      md: { icon: '📋', color: 'bg-purple-500' },
      xls: { icon: '📊', color: 'bg-green-500' },
      xlsx: { icon: '📊', color: 'bg-green-500' },
      ppt: { icon: '📽️', color: 'bg-orange-500' },
      pptx: { icon: '📽️', color: 'bg-orange-500' },
    };
    return iconMap[ext || ''] || { icon: '📁', color: 'bg-gray-400' };
  };

  const { icon, color } = getFileIcon();

  return (
    <div
      className={`group relative aspect-square w-full overflow-hidden rounded-md border-2 transition-all duration-150 ${
        isSelected
          ? 'border-myTexthighlight'
          : 'hover:border-myTexthighlight border-transparent'
      }`}
    >
      {/* 文档图标背景 */}
      <div
        className={`flex h-full w-full items-center justify-center ${color} bg-opacity-10 transition-all duration-300 ${
          isSelected ? 'brightness-90' : 'group-hover:brightness-90'
        }`}
      >
        <div className='text-6xl'>{icon}</div>
      </div>

      {/* hover 或选中时显示的信息遮罩 */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center bg-black transition-all duration-300 ${
          isSelected
            ? 'bg-opacity-20 opacity-100'
            : 'bg-opacity-0 group-hover:bg-opacity-20 opacity-0 group-hover:opacity-100'
        }`}
      >
        <input
          type='checkbox'
          className='absolute top-4 left-4 h-[16px] w-[16px] cursor-pointer'
          checked={isSelected}
          onChange={onToggle}
        />
        <p className='text-lightTextColor mb-1 max-w-[90%] overflow-hidden px-2 text-center text-xs font-semibold text-ellipsis whitespace-nowrap'>
          {filename}
        </p>
        <p className='text-myTextHighlight text-[12px]'>
          {formatFileSize(size)}
        </p>
      </div>
    </div>
  );
};

export default Document;

