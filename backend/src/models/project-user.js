'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project_User extends Model {
    static associate(models) {}
  }
  Project_User.init(
    {
      project_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Project_User',
    }
  );
  return Project_User;
};
