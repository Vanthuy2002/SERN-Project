const webRoutes = require('./web');
const authRoutes = require('./auth');
const userRoutes = require('./users');
const groupRoutes = require('./groups');

const defineRoutes = (app) => {
  app.use('/', webRoutes);
  app.use('/auth', authRoutes);
  app.use('/api', userRoutes);
  app.use('/group', groupRoutes);
};

module.exports = defineRoutes;
