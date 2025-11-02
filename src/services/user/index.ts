import { post } from '../index';
import type { Result } from '../Result';
import type {
  RegisterParams,
  RegisterResponse,
  LoginParams,
  LoginResponse,
  RefreshTokenResponse,
} from '@/types/user';

export const register = (
  data: RegisterParams
): Promise<Result<RegisterResponse>> => {
  return post<RegisterResponse>('/auth/register', data);
};

export const login = (data: LoginParams): Promise<Result<LoginResponse>> => {
  return post<LoginResponse>('/auth/login', data);
};

//无感刷新acc
export const refreshToken = (): Promise<Result<RefreshTokenResponse>> => {
  return post<RefreshTokenResponse>('/auth/refresh');
};

export const logout = (): Promise<Result<void>> => {
  return post<void>('/auth/logout');
};
