const webRoutes = require('./web');

const defineRoutes = (app) => {
  app.use('/', webRoutes);
};

module.exports = defineRoutes;
