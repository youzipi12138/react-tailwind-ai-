import React from 'react';
import type { ImageItem } from '@/services/images/types';
import { formatFileSize } from '@/utils/format';

const Image: React.FC<ImageItem> = ({ path, filename, size }) => {
  return (
    <div className='hover:border-myTexthighlight group relative aspect-square w-full overflow-hidden rounded-md border-2 border-transparent transition-all duration-150'>
      <img
        src={path}
        alt={filename}
        className='h-full w-full object-cover transition-all duration-300 group-hover:brightness-60'
      />
      {/* hover 显示的信息遮罩 */}
      <div className='bg-opacity-0 group-hover:bg-opacity-20 absolute inset-0 flex flex-col items-center justify-center bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100'>
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
