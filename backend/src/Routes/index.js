const webRoutes = require('./web');
const apiRoutes = require('./api');

const defineRoutes = (app) => {
  app.use('/', webRoutes);
  app.use('/api', apiRoutes);
};

module.exports = defineRoutes;
