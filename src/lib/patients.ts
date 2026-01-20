import { api } from './api';

export interface CreatePatientPayload {
  name: string;
  gender_id: number;
  dob?: string;
  phone?: string;
  abha_id?: string;
  address?: {
    line1?: string;
    line2?: string;
    pincode?: string;
    village_id?: number;
    facility_id?: number;
  };
}

export const patientsApi = {
  create: (payload: CreatePatientPayload) => api.post('/patients', payload),
  get: (id: number | string) => api.get(`/patients/${id}`),
  list: (q?: string) => api.get('/patients', { params: { q } }),
};

export default patientsApi;
