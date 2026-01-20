import { api } from './api';

export interface CreateVisitPayload {
  patient_id: number;
  visit_type_id: number;
  visit_date: string;
  notes?: string;
}

export const visitsApi = {
  create: (payload: CreateVisitPayload) => api.post('/visits', payload),
  list: () => api.get('/visits'),
};

export default visitsApi;
