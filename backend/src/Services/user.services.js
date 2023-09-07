const bcrypt = require('bcryptjs');
const UserDb = require('../Model/Users');

const hashUserPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);
  return hashPass;
};

const createUser = (email, password, username) => {
  if (!email || !password) {
    throw new Error('Please enter complete data');
  }
  const hashPass = hashUserPassword(password);

  UserDb.query(
    `INSERT INTO users (email, password, username) VALUES (?, ?, ?)`,
    [email, hashPass, username],
    (err, data) => {
      err && console.log(err.toString());
      console.log(data);
    }
  );
};

const getUsers = () => {
  UserDb.query('SELECT * FROM `users`', (err, data) => {
    err && console.log(err.toString());
    console.log(data);
  });
};

module.exports = { createUser, getUsers };
