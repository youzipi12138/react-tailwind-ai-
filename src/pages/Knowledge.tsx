import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ImageList from './KnowledgeComponents/image';
import KnowledgeHeader from './components/KnowledgeHeader';
import ImageTable from './KnowledgeComponents/image/ImageTable';
import { useImages } from '@/hooks/useImages';
import Upload from './components/Upload';
const Knowledge: React.FC = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  const {
    imageCount,
    selectedCount,
    isAllSelected,
    isIndeterminate,
    selectedImageIds,
    isGrid,
    deleteImage,
    toggleSelectAll,
    setIsGrid,
  } = useImages();
  // 根据不同的 category 参数渲染不同的内容
  const renderContent = () => {
    switch (category) {
      case 'documents':
        return (
          <div className='p-6'>
            <h2 className='text-lightTextColor mb-4 text-2xl font-bold'>
              文档列表
            </h2>
            <p className='text-darkTextColor'>这里显示所有文档文件</p>
            {/* 这里可以添加文档列表组件 */}
          </div>
        );
      case 'images':
        return (
          <div className='flex h-full justify-center overflow-y-auto p-6'>
            {imageCount > 0 ? (
              isGrid ? (
                <ImageList />
              ) : (
                <ImageTable />
              )
            ) : (
              <div className='mt-[200px]'>
                <Upload />
              </div>
            )}
          </div>
        );
      case 'audio':
        return (
          <div className='p-6'>
            <h2 className='text-lightTextColor mb-4 text-2xl font-bold'>
              语音列表
            </h2>
            <p className='text-darkTextColor'>这里显示所有语音文件</p>
            {/* 这里可以添加语音列表组件 */}
          </div>
        );
      case 'video':
        return (
          <div className='p-6'>
            <h2 className='text-lightTextColor mb-4 text-2xl font-bold'>
              视频列表
            </h2>
            <p className='text-darkTextColor'>这里显示所有视频文件</p>
            {/* 这里可以添加视频列表组件 */}
          </div>
        );
      default:
        // 没有参数或参数为空时，显示全部文件
        return (
          <div className='p-6'>
            <h2 className='text-lightTextColor mb-4 text-2xl font-bold'>
              全部文件
            </h2>
            <p className='text-darkTextColor'>这里显示所有类型的文件</p>
            {/* 这里可以添加全部文件列表组件 */}
          </div>
        );
    }
  };

  return (
    <div className='h-full'>
      {imageCount > 0 && (
        <KnowledgeHeader
          imageCount={imageCount}
          selectedCount={selectedCount}
          isAllSelected={isAllSelected}
          isIndeterminate={isIndeterminate}
          selectedImageIds={Array.from(selectedImageIds)}
          deleteImage={deleteImage}
          toggleSelectAll={toggleSelectAll}
          setIsGrid={setIsGrid}
          isGrid={isGrid}
        />
      )}
      {renderContent()}
    </div>
  );
};

export default Knowledge;
