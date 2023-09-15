const userCtrl = require('../../Controllers/users');

const userRoutes = require('express').Router();

userRoutes.get('/user', userCtrl.handleGetUsers);

userRoutes.get('/user/:id', userCtrl.handleGetUser);

userRoutes.post('/user/create', userCtrl.handleCreateUser);

userRoutes.patch('/user/:id', userCtrl.handleUpdateUser);

userRoutes.delete('/user/:id', userCtrl.handleDelete);

module.exports = userRoutes;
