const db = require('../models');

const compareRoles = (data, role) => {
  if (!Array.isArray(data) || !Array.isArray(role)) return null;
  const diff = data.filter(
    (item) => !role.some((value) => item.url === value.url)
  );
  return diff;
};

const getAllRoles = async (page, limit) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await db.Role.findAndCountAll({
    attributes: ['id', 'url', 'desc', 'createdAt', 'updatedAt'],
    offset,
    limit,
  });

  const totalPages = Math.ceil(count / limit);
  const roles = [...rows];

  if (roles) {
    return {
      message: 'Get roles successfully',
      codeNum: 1,
      count,
      roles,
      totalPages,
    };
  }
  return {
    message: 'No roles was found',
    codeNum: 0,
    count: 0,
    roles: [],
  };
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
      status: 201,
    };
  }
};

const deleteRole = async (id) => {
  const role = await db.Role.findOne({
    where: { id },
  });

  if (role) {
    await db.Role.destroy({
      where: { id },
    });
    return {
      message: 'Delete role successfull',
      codeNum: 1,
      status: 200,
    };
  } else {
    return {
      message: 'No role was found',
      codeNum: 0,
      status: 404,
    };
  }
};

const getDetail = async (id) => {
  const group = await db.Group.findOne({
    where: { id },
    attributes: ['id', 'name', 'desc'],
    include: {
      model: db.Role,
      attributes: ['id', 'url', 'desc'],
      through: { attributes: [] },
    },
  });
  if (group) {
    return {
      message: 'Successfully!',
      codeNum: 1,
      group,
    };
  } else {
    return {
      message: 'Not found group!',
      codeNum: 0,
      group: {},
    };
  }
};

const assignRole = async (body) => {
  const { groupId, data } = body;

  await db.Group_Role.destroy({
    where: { groupId: +groupId },
  });

  if (data.length > 0) {
    await db.Group_Role.bulkCreate(data);
    return {
      message: `Create ${data.length} roles successfully!!`,
      codeNum: 1,
      status: 201,
    };
  } else {
    return {
      message: 'Nothing to update',
      codeNum: 0,
      status: 404,
    };
  }
};

module.exports = {
  createRoles,
  getAllRoles,
  deleteRole,
  getDetail,
  assignRole,
};
