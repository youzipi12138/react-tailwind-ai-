import { message } from 'antd';
import type { UploadProps } from 'antd';
import { uploadImage } from '@/services/images';
import type { ImageItem } from '@/services/images/types';

interface UploadConfigOptions {
  // eslint-disable-next-line no-unused-vars
  onSuccess?: (data: ImageItem) => void; // 上传成功回调，接收返回的图片数据
  onError?: () => void; // 上传失败回调
  category?: string; // 文件分类
  folder?: string; // 上传文件夹
}

/**
 * 文件上传配置（使用自定义 axios 请求）
 */
export const getUploadConfig = (options?: UploadConfigOptions): UploadProps => {
  return {
    name: 'file',
    // 使用 customRequest 替代 action，完全控制上传逻辑
    customRequest: async ({ file, onSuccess, onError, onProgress }) => {
      try {
        // 调用自己的 axios API
        const result = await uploadImage(file as File, {
          category: options?.category || 'images',
          folder: options?.folder,
          onProgress: percent => {
            // 更新进度条
            onProgress?.({ percent });
          },
        });

        // 通知 Upload 组件上传成功
        onSuccess?.('ok');

        // 显示成功提示
        message.success(`${(file as File).name} 上传成功`);

        // 执行自定义成功回调，传递返回的数据
        if (result.code === 200 && result.data) {
          options?.onSuccess?.(result.data);
        }
      } catch (error) {
        // 通知 Upload 组件上传失败
        onError?.(error as Error);

        // 显示失败提示
        message.error(
          `${(file as File).name} 上传失败: ${(error as Error).message}`
        );

        // 执行自定义失败回调
        options?.onError?.();
      }
    },
    // 不显示上传列表
    showUploadList: false,
  };
};

/**
 * 文件夹上传配置（使用自定义 axios 请求）
 */
export const getFolderUploadConfig = (
  options?: UploadConfigOptions
): UploadProps => {
  return {
    name: 'file',
    directory: true, // 支持文件夹上传
    // 使用 customRequest 替代 action
    customRequest: async ({ file, onSuccess, onError, onProgress }) => {
      try {
        // 调用自己的 axios API
        const result = await uploadImage(file as File, {
          category: options?.category || 'folders',
          folder: options?.folder,
          onProgress: percent => {
            onProgress?.({ percent });
          },
        });

        onSuccess?.('ok');
        message.success(`${(file as File).name} 上传成功`);

        // 执行自定义成功回调，传递返回的数据
        if (result.code === 200 && result.data) {
          options?.onSuccess?.(result.data);
        }
      } catch (error) {
        onError?.(error as Error);
        message.error(
          `${(file as File).name} 上传失败: ${(error as Error).message}`
        );
        options?.onError?.();
      }
    },
    showUploadList: false,
  };
};
