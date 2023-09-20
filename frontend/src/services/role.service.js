import { api } from '@/config';

const createRoles = async (body) => {
  const res = await api.post('role/create', body);
  return res.data;
};

const getAllRoles = async (page, limit) => {
  const res = await api.get(`role?page=${page}&limit=${limit}`);
  return res.data;
};

const deleteService = async (id) => {
  const res = await api.delete(`role/delete/${id}`);
  return res.data;
};

export { createRoles, getAllRoles, deleteService };
