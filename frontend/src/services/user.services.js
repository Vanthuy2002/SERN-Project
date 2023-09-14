import { api } from '@/config';

const getAllUsers = async (page) => {
  const res = await api.get(`api/user?page=${page}`);
  return res.data;
};

const createUser = async (body) => {
  const res = await api.post('api/user/create', body);
  return res.data;
};

const getAllGroups = async () => {
  const res = await api.get('group');
  return res.data;
};

const deleteUser = async (id) => {
  const res = await api.delete(`api/user/${id}`);
  return res.data;
};

export { getAllGroups, getAllUsers, deleteUser, createUser };
