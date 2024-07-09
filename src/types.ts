// src/types.ts

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: 'user' | 'admin';
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
  role: 'user' | 'admin';
}
