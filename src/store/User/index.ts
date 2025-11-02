import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { register, login, logout as logoutApi } from '@/services/user';
import type { RegisterParams, LoginParams, UserInfo } from '@/types/user';
import { showError, showSuccess } from '@/utils/notification';

interface UserStore {
  user: UserInfo | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  // eslint-disable-next-line no-unused-vars
  register: (params: RegisterParams) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  login: (params: LoginParams) => Promise<void>;
  logout: () => void;
  // eslint-disable-next-line no-unused-vars
  updateAccessToken: (token: string) => void;
}

// localStorage 的 key
const STORAGE_KEY = 'user-storage';

export const useUserStore = create<UserStore>()(
  persist(
    set => ({
      user: null,
      accessToken: null,
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
          // 保存用户信息和 token（会自动持久化到 localStorage）
          set({
            user: data.user,
            accessToken: data.accessToken,
          });

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
          user: null,
          accessToken: null,
        });
        logoutApi();
      },
      updateAccessToken: (token: string) => {
        set({ accessToken: token });
      },
    }),
    {
      name: STORAGE_KEY,
      // 只持久化 user 和 accessToken，不持久化 loading 和 error
      partialize: state => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);
