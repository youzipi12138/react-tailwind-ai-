import { useUserStore } from '@/store/User';

export const useUserHooks = () => {
  const { user, loading, error, register, login, logout, accessToken } =
    useUserStore();
  return { user, loading, error, register, login, logout, accessToken };
};
