import React, { useState, useRef, useEffect } from 'react';
import { ActionIcon } from '@lobehub/ui';
import { List, LayoutGrid } from 'lucide-react';
import { useImages } from '@/hooks/useImages';

const KnowledgeHeader: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const {
    imageCount,
    selectedCount,
    isAllSelected,
    isIndeterminate,
    toggleSelectAll,
    setIsGrid,
  } = useImages();

  const checkboxRef = useRef<HTMLInputElement>(null);

  // 设置 indeterminate 状态
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  return (
    <div className='border-borderColor mx-6 flex h-[50px] items-center justify-between border-b py-2'>
      <div className='flex items-center'>
        <input
          ref={checkboxRef}
          type='checkbox'
          checked={isAllSelected}
          onChange={toggleSelectAll}
          className='h-4 w-4 cursor-pointer'
        />
        <span className='text-lightTextColor ml-3 text-base'>
          {selectedCount > 0 ? `已选 ${selectedCount} / ` : ''}共 {imageCount}{' '}
          项
        </span>
      </div>
      <div className='flex items-center gap-2'>
        <ActionIcon
          icon={List}
          color={
            viewMode === 'list'
              ? 'var(--color-myTexthighlight)'
              : 'var(--color-myTextColor)'
          }
          onClick={() => {
            setViewMode('list');
            setIsGrid(false);
          }}
        />
        <ActionIcon
          icon={LayoutGrid}
          color={
            viewMode === 'grid'
              ? 'var(--color-myTexthighlight)'
              : 'var(--color-myTextColor)'
          }
          onClick={() => {
            setViewMode('grid');
            setIsGrid(true);
          }}
        />
      </div>
    </div>
  );
};

export default KnowledgeHeader;
