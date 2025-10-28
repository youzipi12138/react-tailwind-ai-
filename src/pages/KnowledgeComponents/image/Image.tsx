import React from 'react';
import type { ImageItem } from '@/services/images/types';
import { formatFileSize } from '@/utils/format';

// 部分	含义
// React.FC	React Function Component（函数组件类型）
// <ImageItem>	泛型参数：指定这个组件的 props 类型是 ImageItem

// 展示组件：只负责渲染，所有数据通过 props 传入
const Image: React.FC<
  ImageItem & {
    isSelected: boolean;
    onToggle: () => void;
  }
> = ({ path, filename, size, isSelected, onToggle }) => {
  return (
    <div
      className={`group relative aspect-square w-full overflow-hidden rounded-md border-2 transition-all duration-150 ${
        isSelected
          ? 'border-myTexthighlight'
          : 'hover:border-myTexthighlight border-transparent'
      }`}
    >
      <img
        src={path}
        alt={filename}
        className={`h-full w-full object-cover transition-all duration-300 ${
          isSelected ? 'brightness-60' : 'group-hover:brightness-60'
        }`}
      />
      {/* hover 或选中时显示的信息遮罩 */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center bg-transparent transition-all duration-300 ${
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
export default Image;
