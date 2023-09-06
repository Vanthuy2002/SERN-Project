const UserDb = require('../../Model/Users');

const renderHomePage = async (req, res) => {
  try {
    const name = 'Thuy Nguyen';
    res.render('home.ejs', { name });
  } catch (error) {
    console.log(error.toString());
  }
};

const renderUserPages = async (req, res) => {
  try {
    res.render('user.ejs');
  } catch (error) {
    console.log(error.toString());
  }
};

const handleCreateUsers = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    if (!email || !password) {
      throw new Error('Please enter complete data');
    }
    UserDb.query(
      `INSERT INTO users (email, password, username) VALUES (?, ?, ?)`,
      [email, password, username],
      (err, data) => {
        err && console.log(err.toString());
        console.log(data);
      }
    );
  } catch (exection) {
    res.status(400).json({ message: exection.toString() });
  }
};

const webCtrl = { renderHomePage, renderUserPages, handleCreateUsers };
module.exports = webCtrl;
