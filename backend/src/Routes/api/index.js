const apiRoutes = require('express').Router();
const { apiCtrl } = require('../../Controllers');

apiRoutes.post('/register', apiCtrl.handleRegister);
apiRoutes.post('/login', apiCtrl.handleLogin);

module.exports = apiRoutes;
