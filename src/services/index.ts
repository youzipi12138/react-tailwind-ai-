import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';
import { Result } from './Result';

// 定义NProgress类型
type NProgress = {
  start: () => void;
  done: () => void;
};

// 创建axios实例
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // 从环境变量获取API基础URL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    // console.log('发送请求:', config);

    // 添加token到请求头
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 添加时间戳防止缓存
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    return config;
  },
  (error: AxiosError) => {
    // 对请求错误做些什么
    // console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // status 2xx 范围内的状态码都会触发该函数
    // console.log('响应成功:', response);

    // 统一处理响应数据
    // {
    //   data: [...],          // 服务器返回的数据主体
    //   status: 200,
    //   statusText: 'OK',
    //   headers: {...},
    //   config: {...},
    //   request: {...}
    // }
    return response;
  },
  (error: AxiosError) => {
    // 超出 2xx 范围的状态码都会触发该函数
    // console.error('响应错误:', error);

    let errorMessage = '网络错误，请稍后重试';
    let errorCode = 500;

    if (error.response) {
      // 服务器响应了错误状态码
      const { status, data } = error.response;
      errorCode = status;

      switch (status) {
        case 400:
          errorMessage = '请求参数错误';
          break;
        case 401:
          errorMessage = '未授权，请重新登录';
          // 清除本地token
          localStorage.removeItem('token');
          // 可以在这里跳转到登录页
          // window.location.href = '/login';
          break;
        case 403:
          errorMessage = '拒绝访问';
          break;
        case 404:
          errorMessage = '请求的资源不存在';
          break;
        case 500:
          errorMessage = '服务器内部错误';
          break;
        case 502:
          errorMessage = '网关错误';
          break;
        case 503:
          errorMessage = '服务不可用';
          break;
        case 504:
          errorMessage = '网关超时';
          break;
        default:
          errorMessage =
            (data as { message?: string })?.message || `请求失败 (${status})`;
      }
    } else if (error.request) {
      // 请求已经发出，但没有收到响应
      errorMessage = '网络连接失败，请检查网络';
    } else {
      // 发生了一些问题，触发了错误
      errorMessage = error.message || '请求配置错误';
    }

    // 创建统一的错误对象
    const customError = new Error(errorMessage) as Error & {
      code: number;
      originalError: AxiosError;
    };
    customError.code = errorCode;
    customError.originalError = error;

    return Promise.reject(customError);
  }
);

export const request = instance;
// 封装常用的请求方法
/* 简化请求方法，统一处理返回结果，并增加loading处理，这里以{success,data,message}格式的返回值为例，具体项目根据实际需求修改 */
// 给 promise 函数添加泛型 T，用于指定 Result 中 data 的类型
const promise = <T>(
  requestPromise: Promise<AxiosResponse<Result<T>>>, // 明确请求响应的数据类型是 Result<T>
  loading?: NProgress | boolean
): Promise<Result<T>> => {
  // 返回 Promise<Result<T>>，与传入的 T 保持一致
  return new Promise((resolve, reject) => {
    if (loading && typeof loading === 'object' && 'start' in loading) {
      loading.start();
    }
    requestPromise
      .then(response => {
        // 此时 response.data 已被推断为 Result<T>，直接返回
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      })
      .finally(() => {
        if (loading && typeof loading === 'object' && 'done' in loading) {
          loading.done();
        }
      });
  });
};
/**
 * 发送get请求   一般用来请求资源
 * @param url    资源url
 * @param params 参数
 * @param loading loading
 * @returns 异步promise对象
 */
export const get = <T>(
  url: string,
  params?: unknown,
  loading?: NProgress | boolean,
  timeout?: number
): Promise<Result<T>> => {
  return promise(request({ url, method: 'get', params, timeout }), loading);
};
/**
 * 发送post请求   一般用来请求资源
 * @param url    资源url
 * @param data 参数
 * @param loading loading
 * @returns 异步promise对象
 */
export const post = <T>(
  url: string,
  data?: unknown,
  loading?: NProgress | boolean,
  timeout?: number
): Promise<Result<T>> => {
  return promise(request({ url, method: 'post', data, timeout }), loading);
};

export const Delete = <T>(
  url: string,
  data?: unknown,
  loading?: NProgress | boolean,
  timeout?: number
): Promise<Result<T>> => {
  return promise(request({ url, method: 'delete', data, timeout }), loading);
};

/**
 * 文件上传接口配置
 */
export interface UploadOptions {
  url: string; // 上传地址
  file: File; // 文件对象
  fieldName?: string; // 文件字段名，默认 'file_to_upload'
  // eslint-disable-next-line no-unused-vars
  onProgress?: (percent: number) => void; // 上传进度回调
  data?: Record<string, string | Blob>; // 额外的表单数据
  timeout?: number; // 超时时间
}

/**
 * 通用文件上传方法
 * @param options 上传配置
 * @returns Promise<Result<T>>
 */
export const upload = <T>(options: UploadOptions): Promise<Result<T>> => {
  const {
    url,
    file,
    fieldName = 'file_to_upload',
    onProgress,
    data,
    timeout,
  } = options;

  // 创建 FormData
  const formData = new FormData();
  formData.append(fieldName, file);

  // 添加额外的表单数据
  if (data) {
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
  }

  return new Promise((resolve, reject) => {
    request({
      url,
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: timeout || 30000, // 默认30秒超时
      onUploadProgress: progressEvent => {
        if (onProgress && progressEvent.total) {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percent);
        }
      },
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
