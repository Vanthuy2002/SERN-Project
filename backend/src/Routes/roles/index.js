const roleRoutes = require('express').Router();
const { roleCtrl } = require('../../Controllers');

roleRoutes.post('/create', roleCtrl.handleCreate);

roleRoutes.post('/assign', roleCtrl.handleAssignRole);

roleRoutes.get('/', roleCtrl.handleGetRoles);

roleRoutes.get('/group/:id', roleCtrl.handleGetDetailRole);

roleRoutes.delete('/delete/:id', roleCtrl.handleDeleteRole);

module.exports = roleRoutes;
