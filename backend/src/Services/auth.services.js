const db = require('../models');
const bcrypt = require('bcryptjs');
const { getGroupWithRoles } = require('../services/jwt.services');
const { generateToken } = require('../middleware/auth');

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

const comparePassword = (password, hassPass) => {
  const isMatched = bcrypt.compareSync(password, hassPass);
  return isMatched;
};

const registerServices = async (body) => {
  const { email, password, username } = body;
  const isExist = await findUserByEmail(email);

  if (isExist) {
    return {
      message: 'User already exits',
      codeNum: -1,
    };
  }
  const hashPass = hashUserPassword(password);
  const user = await db.User.create({
    email,
    username,
    password: hashPass,
    groupId: 2, //User
  });
  return {
    message: 'Create user successfully!',
    codeNum: 1,
    user,
  };
};

const loginServices = async (body) => {
  const { email, password } = body;
  const user = await db.User.findOne({
    where: { email },
    raw: true,
    attributes: ['email', 'username', 'password', 'groupId'],
  });

  if (!user) {
    return {
      message: 'You are not register',
      codeNum: -1,
    };
  }
  const isMatched = comparePassword(password, user.password);
  if (isMatched) {
    const roles = await getGroupWithRoles(user?.groupId);
    const payload = {
      email: user.email,
      username: user.username,
      roles,
    };
    const { password, ...response } = user;
    // not response password
    const accessToken = generateToken(payload);
    return {
      message: 'Login successfully',
      codeNum: 1,
      user: response,
      roles,
      accessToken,
    };
  } else {
    return {
      message: 'Email or password not correct',
      codeNum: -1,
    };
  }
};

const refreshServices = (req) => {
  const user = { email: req?.user.email, username: req?.user.username };
  const roles = { ...req?.user.roles };
  if (user) {
    return {
      user,
      roles,
    };
  }
};

const logoutServices = (res) => {
  res.clearCookie('accessToken');
  return {
    message: 'Logout sucessfully!!',
    codeNum: 1,
  };
};

module.exports = {
  registerServices,
  loginServices,
  findUserByEmail,
  refreshServices,
  logoutServices,
};
