import { api } from './api';

export interface LoginPayload {
  phone: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  phone: string;
  password: string;
  role_id: number;
  facility_id?: number;
}

export const authApi = {
  login: (payload: LoginPayload) => api.post('/auth/login', payload),
  register: (payload: RegisterPayload) => api.post('/auth/register', payload),
};

export default authApi;
