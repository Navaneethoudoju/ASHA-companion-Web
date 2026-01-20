import { api } from './api';

export interface CreateImmunizationPayload {
  patient_id: number;
  vaccine_id: number;
  dose_number: number;
  date_given: string;
  due_date?: string;
  immunization_status_id?: number;
}

export const immunizationsApi = {
  create: (payload: CreateImmunizationPayload) => api.post('/immunizations', payload),
  list: () => api.get('/immunizations'),
};

export default immunizationsApi;
