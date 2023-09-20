const {
  createRoles,
  getAllRoles,
  deleteRole,
  getDetail,
} = require('../../services/role.service');

const handleCreate = async (req, res) => {
  try {
    const { codeNum, message, status } = await createRoles(req.body);
    res.status(status).json({ message, codeNum });
  } catch (err) {
    res.status(500).json({ message: err.toString() });
  }
};

const handleGetRoles = async (req, res) => {
  let { page = 1, limit = 2 } = req.query;
  try {
    const { codeNum, count, message, roles, totalPages } = await getAllRoles(
      +page,
      +limit
    );
    res.status(200).json({ message, codeNum, count, roles, totalPages });
  } catch (err) {
    res.status(500).json({ message: err.toString() });
  }
};

const handleDeleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const { codeNum, message, status } = await deleteRole(id);
    res.status(status).json({ message, codeNum });
  } catch (error) {
    res.status(500).json({ message: err.toString() });
  }
};

const handleGetDetailRole = async (req, res) => {
  const { id } = req.params;
  try {
    const { group, codeNum, message } = await getDetail(id);
    res.status(200).json({ message, codeNum, group });
  } catch (err) {
    res.status(404).json(err.toString());
  }
};

const roleCtrl = {
  handleCreate,
  handleGetRoles,
  handleDeleteRole,
  handleGetDetailRole,
};

module.exports = roleCtrl;
