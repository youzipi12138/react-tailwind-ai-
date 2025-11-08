export interface UploadOptions {
  url: string; // 上传地址
  file: File; // 文件对象
  fieldName?: string; // 文件字段名，默认 'file_to_upload'
  // eslint-disable-next-line no-unused-vars
  onProgress?: (percent: number) => void; // 上传进度回调
  data?: Record<string, string | Blob>; // 额外的表单数据
  timeout?: number; // 超时时间
}
