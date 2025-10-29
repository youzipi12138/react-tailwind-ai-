import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd/es/table';
import type { DocumentItem as tableDataType } from '@/services/Documents/types';
import { useDocuments } from '@/hooks/useDocment';
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
    render: (time: string) => formatTime(time),
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

const DocumentTable: React.FC = () => {
  const { Document: documents, selectedDocumentIds, toggleDocumentSelection } = useDocuments();

  const rowSelection = {
    selectedRowKeys: Array.from(selectedDocumentIds),
    hideSelectAll: true,
    onChange: (selectedRowKeys: React.Key[]) => {
      // 处理选中变化
      const newSelectedIds = new Set(selectedRowKeys as string[]);
      const currentSelectedIds = selectedDocumentIds;

      // 找出新增的选中项
      newSelectedIds.forEach(id => {
        if (!currentSelectedIds.has(id)) {
          toggleDocumentSelection(id);
        }
      });

      // 找出取消选中的项
      currentSelectedIds.forEach(id => {
        if (!newSelectedIds.has(id)) {
          toggleDocumentSelection(id);
        }
      });
    },
  };

  return (
    <div className='w-full'>
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
          
          /* 暗色主题适配 */
          .fixed-height-table .ant-table {
            background: transparent !important;
            color: rgba(255, 255, 255, 0.85) !important;
          }
          .fixed-height-table .ant-table-thead > tr > th {
            background: rgba(255, 255, 255, 0.03) !important;
            color: rgba(255, 255, 255, 0.85) !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
          }
          .fixed-height-table .ant-table-tbody > tr > td {
            border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
            color: rgba(255, 255, 255, 0.65) !important;
          }
          .fixed-height-table .ant-table-tbody > tr:hover > td {
            background: rgba(255, 255, 255, 0.08) !important;
          }
          .fixed-height-table .ant-pagination {
            color: rgba(255, 255, 255, 0.65) !important;
          }
          .fixed-height-table .ant-pagination-item {
            background: transparent !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
          }
          .fixed-height-table .ant-pagination-item a {
            color: rgba(255, 255, 255, 0.65) !important;
          }
          .fixed-height-table .ant-pagination-item-active {
            background: rgba(255, 255, 255, 0.1) !important;
            border-color: #1890ff !important;
          }
          .fixed-height-table .ant-pagination-item-active a {
            color: #1890ff !important;
          }
          .fixed-height-table .ant-pagination-prev button,
          .fixed-height-table .ant-pagination-next button {
            color: rgba(255, 255, 255, 0.65) !important;
          }
        `}
      </style>
      <div className='fixed-height-table-wrapper w-full'>
        <Table
          dataSource={documents}
          columns={columns}
          rowKey='id'
          rowSelection={rowSelection}
          pagination={{ pageSize: 11 }}
          className='fixed-height-table'
        />
      </div>
    </div>
  );
};

export default DocumentTable;

