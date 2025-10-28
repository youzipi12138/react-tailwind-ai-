import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Knowledge: React.FC = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

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
          <div className='p-6'>
            <h2 className='text-lightTextColor mb-4 text-2xl font-bold'>
              图片列表
            </h2>
            <p className='text-darkTextColor'>这里显示所有图片文件</p>
            {/* 这里可以添加图片网格组件 */}
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

  return <div>{renderContent()}</div>;
};

export default Knowledge;
