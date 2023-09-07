const { createUser, getUsers } = require('../../Services/user.services');

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
    const users = getUsers();
  } catch (error) {
    res.status(404).json({ message: exection });
  }
};

const handleCreateUsers = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    createUser(email, password, username);
    res.status(201).json({ message: 'Create user successfully!!' });
  } catch (exection) {
    res.status(400).json({ message: exection.toString() });
  }
};

const webCtrl = {
  renderHomePage,
  renderUserPages,
  handleCreateUsers,
};
module.exports = webCtrl;
