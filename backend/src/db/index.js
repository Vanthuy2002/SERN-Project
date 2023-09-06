const mysql = require('mysql2');

const connectDb = () => {
  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'yt-project',
  });
  console.log('Connect to DB successfully!!');
};

module.exports = connectDb;
