const {
  getUsersAndPaginate,
  createUser,
  deleteUser,
  getUser,
  updateUser,
} = require('../../services/user.services');

const handleGetUsers = async (req, res) => {
  let { page = 1, limit = 2 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  try {
    const { message, codeNum, count, users, totalPages } =
      await getUsersAndPaginate(page, limit);
    res.status(200).json({ message, codeNum, count, totalPages, users });
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

const handleGetUser = async (req, res) => {
  const { id } = req.params;
  try {
    const { message, codeNum, user } = await getUser(id);
    res.status(200).json({ message, codeNum, user });
  } catch (exection) {
    res.status(500).json({ message: exection });
  }
};

const handleUpdateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const { message, codeNum, user } = await updateUser(id, req.body);
    res.status(200).json({ message, codeNum, user });
  } catch (exection) {
    debugger;
    res.status(400).json({ message: exection.toString() });
  }
};

const handleDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const { message, codeNum } = await deleteUser(id);
    res.status(200).json({ message, codeNum });
  } catch (exection) {
    res.status(500).json({ message: exection });
  }
};

const userCtrl = {
  handleGetUsers,
  handleCreateUser,
  handleDelete,
  handleUpdateUser,
  handleGetUser,
};

module.exports = userCtrl;
