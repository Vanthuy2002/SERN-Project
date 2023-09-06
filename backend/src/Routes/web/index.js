const { webCtrl } = require('../../Controllers');

const webRoutes = require('express').Router();

webRoutes.get('/', webCtrl.renderHomePage);

webRoutes.get('/user', webCtrl.renderUserPages);

webRoutes.post('/user/create', webCtrl.handleCreateUsers);

module.exports = webRoutes;
