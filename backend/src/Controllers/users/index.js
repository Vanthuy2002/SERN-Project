const { getUsers, createUser } = require('../../services/user.services');

const handleGetUsers = async (req, res) => {
  try {
    const { message, users, codeNum } = await getUsers();
    res.status(200).json({ message, codeNum, users });
  } catch (exection) {
    res.status(404).json(exection);
  }
};

const handleCreateUser = async (req, res) => {
  try {
    const { message, codeNum, status } = await createUser({ ...req.body });
    res.status(status).json({ message, codeNum });
  } catch (exection) {
    res.status(500).json({ exection });
  }
};

const handleUpdateUser = async (req, res) => {};

const handleDelete = async (req, res) => {};

const userCtrl = {
  handleGetUsers,
  handleCreateUser,
  handleDelete,
  handleUpdateUser,
};

module.exports = userCtrl;
