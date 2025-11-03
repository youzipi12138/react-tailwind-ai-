import React from 'react';
import Image from './Image';
import type { ImageItem } from '@/services/images/types';

interface ImageListProps {
  images: ImageItem[];
  selectedImageIds: Set<string>;
  onToggleImage: (id: string) => void; // eslint-disable-line
}

// 展示组件：只负责渲染，数据通过 props 传入
const ImageList: React.FC<ImageListProps> = React.memo(
  ({ images, selectedImageIds, onToggleImage }) => {
    return (
      <div className='flex flex-wrap gap-[8px] p-6'>
        {images.map(image => (
          <Image
            key={image.id}
            {...image}
            isSelected={selectedImageIds.has(image.id)}
            onToggle={() => onToggleImage(image.id)}
          />
        ))}
      </div>
    );
  },
  // 自定义比较函数：只有当 images 数组或 selectedImageIds 变化时才重新渲染
  (prevProps, nextProps) => {
    return (
      prevProps.images === nextProps.images &&
      prevProps.selectedImageIds === nextProps.selectedImageIds &&
      prevProps.onToggleImage === nextProps.onToggleImage
    );
  }
);

ImageList.displayName = 'ImageList';

export default ImageList;
