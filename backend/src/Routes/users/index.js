const userCtrl = require('../../Controllers/users');

const userRoutes = require('express').Router();

userRoutes.get('/user', userCtrl.handleGetUsers);

userRoutes.get('/user/read/:id', userCtrl.handleGetUser);

userRoutes.post('/user/create', userCtrl.handleCreateUser);

userRoutes.patch('/user/update/:id', userCtrl.handleUpdateUser);

userRoutes.delete('/user/delete/:id', userCtrl.handleDelete);

module.exports = userRoutes;
