const db = require('../models');
const { findUserByEmail } = require('./auth.services');
const { hashUserPassword } = require('./web.services');

const getUsersAndPaginate = async (page, limit) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await db.User.findAndCountAll({
    attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt'],
    include: { model: db.Group, attributes: ['id', 'name', 'desc'] },
    offset,
    limit,
  });
  const totalPages = Math.ceil(count / limit);
  const users = [...rows];

  if (users) {
    return {
      message: 'Get users successfully',
      codeNum: 1,
      count,
      users,
      totalPages,
    };
  }
  return {
    message: 'No users was found',
    codeNum: 0,
    count: 0,
    users: [],
  };
};

const createUser = async (body) => {
  const { email, password, username, phone, addr, groupId, sex } = body;
  const isExist = await findUserByEmail(email);

  if (isExist)
    return {
      message: 'User already exists',
      codeNum: 0,
      status: 400,
    };

  const hashPass = hashUserPassword(password);
  const user = await db.User.create({
    email,
    password: hashPass,
    username,
    phone,
    addr,
    sex,
    groupId,
  });
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

const getUser = async (id) => {
  const user = await db.User.findOne({
    where: { id },
    attributes: ['id', 'username', 'email', 'phone', 'addr', 'sex', 'groupId'],
  });
  if (user) {
    return {
      message: 'Get user ok',
      codeNum: 1,
      user,
    };
  } else {
    return {
      message: 'No user not found',
      codeNum: 0,
      user: [],
    };
  }
};

const updateUser = async (id, body) => {
  const { username, sex, groupId, addr, phone } = body;
  const user = await db.User.findOne({ where: { id } });
  if (user) {
    await user.update({ username, sex, groupId, addr, phone });
    await user.save();
    return {
      message: 'Update user successfully!',
      codeNum: 1,
      user,
    };
  } else {
    return {
      message: 'User not found',
      codeNum: 0,
      user: {},
    };
  }
};

const deleteUser = async (id) => {
  const user = await db.User.findOne({ where: { id } });
  if (user) {
    await db.User.destroy({
      where: { id },
    });
    return {
      message: 'Delete user successfully!',
      codeNum: 1,
    };
  } else {
    return {
      message: 'Can not delete user!',
      codeNum: 0,
    };
  }
};

module.exports = {
  getUsersAndPaginate,
  createUser,
  updateUser,
  deleteUser,
  getUser,
};
