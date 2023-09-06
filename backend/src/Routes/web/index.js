const webRoutes = require('express').Router();

webRoutes.get('/', (req, res) => res.send('This is Home Page'));

module.exports = webRoutes;
