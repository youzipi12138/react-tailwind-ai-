import { useEffect } from 'react';
import { useDocumentStore } from '@/store/Documents';

export const useDocuments = () => {
  const {
    Document,
    loading,
    error,
    selectedDocumentIds,
    isGrid,
    fetchDocuments,
    clearError,
    deleteDocument,
    toggleDocumentSelection,
    toggleSelectAll,
    setIsGrid,
    setIsList,
  } = useDocumentStore();

  useEffect(() => {
    fetchDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 计算全选状态
  const isAllSelected =
    selectedDocumentIds.size === Document.length && Document.length > 0;
  const isIndeterminate =
    selectedDocumentIds.size > 0 && selectedDocumentIds.size < Document.length;

  return {
    documentCount: Document.length,
    selectedCount: selectedDocumentIds.size,
    Document,
    loading,
    error,
    selectedDocumentIds,
    isAllSelected,
    isIndeterminate,
    isGrid,
    clearError,
    deleteDocument,
    toggleDocumentSelection,
    toggleSelectAll,
    setIsGrid,
    setIsList,
  };
};
