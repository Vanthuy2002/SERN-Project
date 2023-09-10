const db = require('../models');
const bcrypt = require('bcryptjs');

const hashUserPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);
  return hashPass;
};

const findUserByEmail = async (email) => {
  const user = await db.User.findOne({ where: { email } });
  if (user) return true;
  return false;
};

const register = async (body) => {
  const { email, password, username } = body;
  const isExist = await findUserByEmail(email);
  if (isExist) {
    return {
      message: 'User already exits',
      codeNum: -1,
    };
  }
  const hashPass = hashUserPassword(password);
  const user = await db.User.create({ email, password: hashPass, username });
  return {
    message: 'Create user successfully!',
    codeNum: 1,
    user,
  };
};

module.exports = { register };
