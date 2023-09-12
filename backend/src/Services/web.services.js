const bcrypt = require('bcryptjs');
const db = require('../models');

const hashUserPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);
  return hashPass;
};

const createUser = async (email, password, username) => {
  if (!email || !password) {
    throw new Error('Please enter complete data');
  }
  const hashPass = hashUserPassword(password);
  await db.User.create({ email, password: hashPass, username });
};

const getUsers = async () => {
  const users = await db.User.findAll();
  return users;
};

const deleteUser = async (id) => {
  await db.User.destroy({
    where: { id },
  });
};

const getUserById = async (id) => {
  const user = await db.User.findOne({
    where: { id },
    attributes: ['id', 'username', 'email', 'createdAt'],
    include: { model: db.Group },
    raw: true,
    nest: true,
  });

  console.log('🚀 ~ getUserById ~ user:', user);

  await db.Group.findAll({
    where: { id },
    include: { model: db.Role },
    raw: true,
    nest: true,
  }); // get from table Group

  const roles = await db.Role.findAll({
    include: {
      model: db.Group,
      where: { id },
      attributes: ['id', 'name', 'desc'],
    },
    attributes: ['id', 'url', 'desc'],
    raw: true,
    nest: true,
  });
  // get from table Role , get id, url, desc
  // Group table get id, name , desc

  console.log('🚀 ~ getUserById ~ roles:', roles);

  return user;
};

const updateUser = async (username, email, id) => {
  await db.User.update({ username, email }, { where: { id } });
};

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  hashUserPassword,
};
