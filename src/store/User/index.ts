import { create } from 'zustand';
import { register, login } from '@/services/user';
import type { RegisterParams, LoginParams, UserInfo } from '@/types/user';
import { showError, showSuccess } from '@/utils/notification';

interface UserStore {
  user: UserInfo | undefined;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  register: (params: RegisterParams) => Promise<void>;
  login: (params: LoginParams) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserStore>(set => ({
  user: undefined,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  register: async (params: RegisterParams) => {
    set({ loading: true, error: null });
    try {
      const { code, data, message } = await register(params);
      if (code !== 201) {
        throw new Error(message);
      }
      set({ user: data as unknown as UserInfo });
      showSuccess(message);
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '注册失败' });
      showError(error instanceof Error ? error.message : '注册失败');
    } finally {
      set({ loading: false });
    }
  },
  login: async (params: LoginParams) => {
    set({ loading: true, error: null });
    try {
      const { code, data, message } = await login(params);
      if (code !== 200 && code !== 201) {
        throw new Error(message);
      }
      // 保存用户信息和 token
      set({
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      // 将 token 存储到 localStorage
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      showSuccess(message || '登录成功');
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '登录失败' });
      showError(error instanceof Error ? error.message : '登录失败');
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  logout: () => {
    set({
      user: undefined,
      accessToken: null,
      refreshToken: null,
    });
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },
}));
