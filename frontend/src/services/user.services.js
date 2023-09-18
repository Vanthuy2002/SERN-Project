import { api } from '@/config';

const getAllUsers = async (page) => {
  const res = await api.get(`api/user?page=${page}&limit=2`);
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

const getUser = async (id) => {
  const res = await api.get(`api/user/${id}`);
  return res.data;
};

const updateUser = async (id, body) => {
  const res = await api.patch(`api/user/${id}`, body);
  return res.data;
};

const deleteUser = async (id) => {
  const res = await api.delete(`api/user/${id}`);
  return res.data;
};

export {
  getAllUsers,
  getAllGroups,
  deleteUser,
  createUser,
  getUser,
  updateUser,
};
