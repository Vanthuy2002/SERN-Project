const mysql = require('mysql2');
const mysql2 = require('mysql2/promise');

const UsersDb = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'yt-project',
});

const AsyncUsersDb = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'yt-project',
});

module.exports = { UsersDb, AsyncUsersDb };
