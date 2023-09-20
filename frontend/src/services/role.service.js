import { api } from '@/config';

const createRoles = async (body) => {
  const res = await api.post('role/create', body);
  return res.data;
};

export { createRoles };
