const bcrypt = require('bcryptjs');
const { AsyncUsersDb, UsersDb } = require('../Model/Users');

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

  UsersDb.query(
    `INSERT INTO users (email, password, username) VALUES (?, ?, ?)`,
    [email, hashPass, username],
    (err, data) => {
      err && console.log(err.toString());
      console.log(data);
    }
  );
};

const getUsers = async () => {
  const connection = await AsyncUsersDb;
  const [rows] = await connection.execute('SELECT * FROM `users`');
  return rows;
};

const deleteUser = async (id) => {
  const connection = await AsyncUsersDb;
  await connection.execute('DELETE FROM users WHERE id=?', [id]);
};

const getUserById = async (id) => {
  const connection = await AsyncUsersDb;
  const [rows] = await connection.execute('SELECT * FROM users WHERE id=?', [
    id,
  ]);
  return rows[0];
};

const updateUser = async (username, email, id) => {
  const connection = await AsyncUsersDb;
  const [data] = await connection.execute(
    'UPDATE users SET email = ?, username = ? WHERE id = ?',
    [email, username, id]
  );
  return data;
};

module.exports = { createUser, getUsers, deleteUser, getUserById, updateUser };
