import { api } from './api';

export interface CreatePregnancyPayload {
  patient_id: number;
  start_date: string;
  edd?: string;
  risk_level_id?: number;
  pregnancy_status_id?: number;
}

export const pregnanciesApi = {
  create: (payload: CreatePregnancyPayload) => api.post('/pregnancies', payload),
  list: () => api.get('/pregnancies'),
};

export default pregnanciesApi;
