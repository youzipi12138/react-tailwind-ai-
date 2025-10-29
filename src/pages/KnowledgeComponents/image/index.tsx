import React from 'react';
import { useImages } from '@/hooks/useImages';
import Image from './Image';

// 容器组件：负责数据获取和状态管理
const ImageList: React.FC = () => {
  const { images, selectedImageIds, toggleImageSelection, isGrid } =
    useImages();

  return (
    <div className='grid grid-cols-3 gap-4 lg:grid-cols-4 xl:grid-cols-5'>
      {images.map(image => (
        <Image
          key={image.id}
          {...image}
          isSelected={selectedImageIds.has(image.id)}
          onToggle={() => toggleImageSelection(image.id)}
        />
      ))}
    </div>
  );
};

export default ImageList;
