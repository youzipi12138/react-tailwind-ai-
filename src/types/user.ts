// 用户相关类型定义

export interface RegisterParams {
  username: string;
  password: string;
}

export interface RegisterResponse {
  userId: string;
  username: string;
}

// 登录相关类型
export interface LoginParams {
  username: string;
  password: string;
}

export interface UserInfo {
  id: string;
  username: string;
  email: string;
}

export interface LoginResponse {
  user: UserInfo;
  accessToken: string;
  tokenType: string;
}
export interface RefreshTokenResponse {
  accessToken: string;
  tokenType: string;
}
