const { createRoles } = require('../../services/role.service');

const handleCreate = async (req, res) => {
  try {
    const { codeNum, message, status } = await createRoles(req.body);
    res.status(status).json({ message, codeNum });
  } catch (err) {
    res.status(500).json({ message: err.toString() });
  }
};

const roleCtrl = { handleCreate };

module.exports = roleCtrl;
