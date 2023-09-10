'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsToMany(models.User, { through: 'Project_User' });
    }
  }
  Project.init(
    {
      name: DataTypes.STRING,
      desc: DataTypes.STRING,
      startDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Project',
    }
  );
  return Project;
};
