const db = require('../models');

const compareRoles = (data, role) => {
  if (!Array.isArray(data) || !Array.isArray(role)) return null;
  const diff = data.filter(
    (item) => !role.some((value) => item.url === value.url)
  );
  return diff;
};

const createRoles = async (body) => {
  const currentRoles = await db.Role.findAll({
    attributes: ['url', 'desc'],
    raw: true,
  });

  const newRoles = compareRoles(body, currentRoles);
  if (newRoles && newRoles.length > 0) {
    await db.Role.bulkCreate(newRoles);
    return {
      message: `Create ${newRoles.length} roles successfully!!`,
      codeNum: 1,
      status: 201,
    };
  } else {
    return {
      message: 'Role has already exists',
      codeNum: 0,
      status: 404,
    };
  }
};

module.exports = { createRoles };
