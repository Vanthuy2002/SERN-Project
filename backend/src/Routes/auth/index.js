const authRoutes = require('express').Router();
const { authCtrl } = require('../../Controllers');

authRoutes.post('/register', authCtrl.handleRegister);
authRoutes.post('/login', authCtrl.handleLogin);
authRoutes.get('/refresh', authCtrl.handleRefresh);
authRoutes.get('/logout', authCtrl.handleLogout);

module.exports = authRoutes;
