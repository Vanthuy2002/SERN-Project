const { webCtrl } = require('../../Controllers');

const webRoutes = require('express').Router();

webRoutes.get('/', webCtrl.renderHomePage);

module.exports = webRoutes;
