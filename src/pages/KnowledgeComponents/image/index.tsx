import React from 'react';
import { useImages } from '@/hooks/useImages';
import Image from './Image';
const ImageList: React.FC = () => {
  const { images } = useImages();

  return (
    <div className='grid grid-cols-3 gap-4 lg:grid-cols-4 xl:grid-cols-5'>
      {images.map(image => (
        <Image key={image.id} {...image} />
      ))}
    </div>
  );
};

export default ImageList;
