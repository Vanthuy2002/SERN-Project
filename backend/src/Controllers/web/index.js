const {
  createUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require('../../Services/user.services');

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
    const users = await getUsers();
    res.render('user.ejs', { users });
  } catch (exection) {
    res.status(404).json({ message: exection });
  }
};

const handleCreateUsers = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    createUser(email, password, username);
    res.status(201).redirect('back');
  } catch (exection) {
    res.status(400).json({ message: exection.toString() });
  }
};

const handleDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.redirect('back');
  } catch (exection) {
    res.status(500).json({ message: exection.toString() });
  }
};

const renderUpdateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (user) res.render('update.ejs', { user });
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
};

const handleUpdateUser = async (req, res) => {
  const { email, username } = req.body;
  const { id } = req.params;
  try {
    if (!email || !username) throw new Error('Please complete all field');
    await updateUser(username, email, id);
    res.status(200).redirect('/user');
  } catch (exection) {
    res.status(500).json({ message: exection.toString() });
  }
};

const webCtrl = {
  renderHomePage,
  renderUserPages,
  handleCreateUsers,
  handleDeleteUser,
  renderUpdateUser,
  handleUpdateUser,
};
module.exports = webCtrl;
