const db = require('../models');

const getGroupWithRoles = async (groupId) => {
  const roles = await db.Group.findOne({
    where: { id: groupId },
    attributes: ['id', 'name', 'desc'],
    include: {
      model: db.Role,
      attributes: ['id', 'url', 'desc'],
      through: { attributes: [] },
    },
  });

  return roles ? roles : {};
};

module.exports = { getGroupWithRoles };
