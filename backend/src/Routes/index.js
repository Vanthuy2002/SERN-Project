const webRoutes = require('./web');
const authRoutes = require('./auth');
const userRoutes = require('./users');
const groupRoutes = require('./groups');
const roleRoutes = require('./roles');
const { checkToken, checkPermission } = require('../middleware/auth');

const defineRoutes = (app) => {
  app.all('*', checkToken);

  app.use('/', webRoutes);
  app.use('/auth', authRoutes);
  app.use('/api', checkPermission, userRoutes);
  app.use('/role', roleRoutes);
  app.use('/group', groupRoutes);
};

module.exports = defineRoutes;
