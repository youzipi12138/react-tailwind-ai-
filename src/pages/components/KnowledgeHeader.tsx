import React, { useState, useRef, useEffect } from 'react';
import { ActionIcon } from '@lobehub/ui';
import { List, LayoutGrid } from 'lucide-react';
import { useImages } from '@/hooks/useImages';
import { Button, Popconfirm } from 'antd';

interface KnowledgeHeaderProps {
  imageCount: number;
  selectedCount: number;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  selectedImageIds: string[];
  isGrid: boolean;
  deleteImage: (imageIds: string[]) => void;
  toggleSelectAll: () => void;
  setIsGrid: (isGrid: boolean) => void;
}

const KnowledgeHeader: React.FC<KnowledgeHeaderProps> = props => {
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
  } = props;

  const checkboxRef = useRef<HTMLInputElement>(null);

  // 设置 indeterminate 状态
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  return (
    <div className='border-borderColor mx-6 flex h-[50px] items-center justify-between border-b py-2'>
      <div className='flex items-center gap-2'>
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
        {selectedCount > 0 && (
          <Popconfirm
            title='确定要删除吗？'
            onConfirm={() => deleteImage(selectedImageIds.map(String))}
            okText='确定'
            cancelText='取消'
          >
            <Button type='primary' style={{ height: '32px' }} danger>
              批量删除
            </Button>
          </Popconfirm>
        )}
      </div>
      <div className='flex items-center gap-2'>
        <ActionIcon
          icon={List}
          color={
            isGrid === false
              ? 'var(--color-myTexthighlight)'
              : 'var(--color-myTextColor)'
          }
          onClick={() => {
            setIsGrid(false);
          }}
        />
        <ActionIcon
          icon={LayoutGrid}
          color={
            isGrid === true
              ? 'var(--color-myTexthighlight)'
              : 'var(--color-myTextColor)'
          }
          onClick={() => {
            setIsGrid(true);
          }}
        />
      </div>
    </div>
  );
};

export default KnowledgeHeader;
