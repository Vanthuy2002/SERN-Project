const db = require('../models');

const getGroups = async () => {
  const groups = await db.Group.findAll({
    order: [['name', 'ASC']],
  });
  if (groups) {
    return {
      message: 'Get all groups successfully',
      codeNum: 1,
      groups,
    };
  }
  return {
    message: 'Can not get groups',
    codeNum: 0,
    groups: [],
  };
};

module.exports = { getGroups };
