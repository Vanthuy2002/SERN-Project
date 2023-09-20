const roleRoutes = require('express').Router();
const { roleCtrl } = require('../../Controllers');

roleRoutes.post('/create', roleCtrl.handleCreate);

module.exports = roleRoutes;
