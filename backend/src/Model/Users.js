const mysql = require('mysql2');

const UsersDb = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'yt-project',
});

module.exports = UsersDb;
