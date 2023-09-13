const { groupCtrl } = require('../../Controllers');

const groupRoutes = require('express').Router();

groupRoutes.get('/', groupCtrl.handleGetGroups);

module.exports = groupRoutes;
