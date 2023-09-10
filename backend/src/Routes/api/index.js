const apiRoutes = require('express').Router();
const { apiCtrl } = require('../../Controllers');

apiRoutes.get('/test', apiCtrl.testApi);

module.exports = apiRoutes;
