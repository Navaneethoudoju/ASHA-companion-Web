import { api } from './api';

export const lookupsApi = {
  fetch: () => api.get('/lookups'),
};

export default lookupsApi;
