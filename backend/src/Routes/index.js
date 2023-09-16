const webRoutes = require('./web');
const authRoutes = require('./auth');
const userRoutes = require('./users');
const groupRoutes = require('./groups');
const { checkToken, checkPermission } = require('../middleware/auth');

const defineRoutes = (app) => {
  app.all('*', checkToken);

  app.use('/', webRoutes);
  app.use('/auth', authRoutes);
  app.use('/api', checkPermission, userRoutes);
  app.use('/group', groupRoutes);
};

module.exports = defineRoutes;
