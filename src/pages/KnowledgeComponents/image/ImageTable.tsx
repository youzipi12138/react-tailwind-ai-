import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd/es/table';
import type { ImageItem as tableDataType } from '@/services/images/types';
import { useImages } from '@/hooks/useImages';
import { formatFileSize, formatTime } from '@/utils/format/index';
const columns: TableProps<tableDataType>['columns'] = [
  {
    title: '文件',
    dataIndex: 'filename',
    key: 'filename',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 150,
    align: 'center' as const,
    render: (time: number) => formatTime(time),
  },
  {
    title: '大小',
    dataIndex: 'size',
    key: 'size',
    width: 200,
    align: 'center' as const,
    render: (size: number) => formatFileSize(size),
  },
];

const ImageTable: React.FC = () => {
  const { images } = useImages();
  return (
    <div>
      <style>
        {`
          .fixed-height-table-wrapper {
            min-height: 540px;
          }
          .fixed-height-table .ant-table-container {
            min-height: 661px !important;
          }
          .fixed-height-table .ant-table-body {
            min-height: 600px !important;
          }
        `}
      </style>
      <div className='fixed-height-table-wrapper'>
        <Table
          dataSource={images}
          columns={columns}
          pagination={{ pageSize: 11 }}
          className='fixed-height-table'
        />
      </div>
    </div>
  );
};

export default ImageTable;
