import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';
import { Result } from './Result';
import { useUserStore } from '@/store/User';
import { refreshToken } from './user';
import type { UploadOptions } from '@/types/upload';
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
  withCredentials: true,
});

// 用于存储刷新token的Promise，防止并发请求时多次刷新
let refreshTokenPromise: Promise<string> | null = null;

// 判断请求是否为刷新token的请求
const isRefreshTokenRequest = (url?: string): boolean => {
  return url?.includes('/auth/refresh') ?? false; //当前面为false时，返回false，否则返回true
};

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    // console.log('发送请求:', config);

    // 动态获取最新的 accessToken
    const accessToken = useUserStore.getState().accessToken;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
  async (error: AxiosError) => {
    // 超出 2xx 范围的状态码都会触发该函数
    // console.error('响应错误:', error);

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // 处理 401 错误 - 实现无感刷新token
    if (error.response?.status === 401 && originalRequest) {
      //提前判断是否是刷新token接口本身返回401，如果是，则直接重新登录
      // 如果是刷新token接口本身返回401，说明refreshToken也过期了，需要重新登录
      if (isRefreshTokenRequest(originalRequest.url)) {
        useUserStore.getState().logout();
        window.location.replace('/login');
        const customError = new Error('登录已过期，请重新登录') as Error & {
          code: number;
          originalError: AxiosError;
        };
        customError.code = 401;
        customError.originalError = error;
        return Promise.reject(customError);
      }

      // 如果已经重试过，直接拒绝
      if (originalRequest._retry) {
        const customError = new Error('未授权，请重新登录') as Error & {
          code: number;
          originalError: AxiosError;
        };
        customError.code = 401;
        customError.originalError = error;
        return Promise.reject(customError);
      }

      // 一开始执行代码从这里开始
      // 标记正在重试
      originalRequest._retry = true;

      try {
        // 如果正在刷新token，等待刷新完成（多个并发请求共享同一个刷新Promise）
        if (!refreshTokenPromise) {
          refreshTokenPromise = refreshToken() //promise 写法，返回一个Promise对象，用于等待刷新token完成
            .then(response => {
              if (response.code === 200 || response.code === 201) {
                const newAccessToken = response.data.accessToken;
                // 更新store中的accessToken
                useUserStore.getState().updateAccessToken(newAccessToken);
                return newAccessToken;
              } else {
                // 刷新失败，清除token并跳转登录
                refreshTokenPromise = null;
                useUserStore.getState().logout();
                window.location.href = '/login';
                throw new Error('刷新token失败，请重新登录');
              }
            })
            .finally(() => {
              // 刷新完成后清空Promise，以便下次需要时重新刷新
              refreshTokenPromise = null;
            });
        }

        // 等待token刷新完成
        await refreshTokenPromise;

        // 使用新的token重试原请求
        const newAccessToken = useUserStore.getState().accessToken;
        if (newAccessToken && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        // 重试原请求
        return instance(originalRequest);
      } catch {
        // 刷新token失败，清除Promise并跳转登录
        refreshTokenPromise = null;
        useUserStore.getState().logout();
        window.location.replace('/login');

        const customError = new Error('登录已过期，请重新登录') as Error & {
          code: number;
          originalError: AxiosError;
        };
        customError.code = 401;
        customError.originalError = error;
        return Promise.reject(customError);
      }
    }

    // 处理其他错误状态码
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
