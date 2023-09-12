const webRoutes = require('./web');
const authRoutes = require('./auth');
const userRoutes = require('./users');

const defineRoutes = (app) => {
  app.use('/', webRoutes);
  app.use('/auth', authRoutes);
  app.use('/api', userRoutes);
};

module.exports = defineRoutes;
