const apiRoutes = require('express').Router();
const { apiCtrl } = require('../../Controllers');

apiRoutes.post('/register', apiCtrl.handleRegister);

module.exports = apiRoutes;
