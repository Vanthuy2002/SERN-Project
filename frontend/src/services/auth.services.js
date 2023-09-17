import { api } from '@/config';

const registerServices = async (body) => {
  const res = await api.post('auth/register', body);
  return res.data;
};

const loginServices = async (body) => {
  const res = await api.post('auth/login', body);
  return res.data;
};

const refreshTokenServices = async () => {
  const res = await api.get('auth/refresh');
  return res.data;
};

export { registerServices, loginServices, refreshTokenServices };
