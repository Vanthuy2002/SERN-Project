const db = require('../models');
const { findUserByEmail } = require('./auth.services');
const { hashUserPassword } = require('./web.services');

const getUsers = async () => {
  const users = await db.User.findAll({
    attributes: ['id', 'username', 'email', 'createdAt'],
    include: { model: db.Group, attributes: ['id', 'name', 'desc'] },
  });
  if (users) {
    return {
      message: 'Get users successfully',
      codeNum: 1,
      users,
    };
  }
  return {
    message: 'No users was found',
    codeNum: 0,
    users: [],
  };
};

const createUser = async (body) => {
  const { email, password, username } = body;
  const isExist = await findUserByEmail(email);

  if (isExist)
    return {
      message: 'User already exists',
      codeNum: 0,
      status: 400,
    };

  const hashPass = hashUserPassword(password);
  const user = await db.User.create({ email, password: hashPass, username });
  if (user) {
    return {
      message: 'Create an user ok',
      codeNum: 1,
      status: 201,
    };
  } else {
    return {
      message: 'An error, try again',
      codeNum: 0,
      status: 500,
    };
  }
};

const updateUser = async () => {};

const deleteUser = async () => {};

module.exports = { getUsers, createUser, updateUser, deleteUser };
