const db = require('../models');

const getGroupWithRoles = async (user) => {
  const roles = await db.Group.findOne({
    where: { id: user?.groupId },
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
