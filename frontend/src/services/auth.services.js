import { api } from '@/config';

const registerServices = async (body) => {
  const res = await api.post('api/register', body);
  return res.data;
};

export { registerServices };
