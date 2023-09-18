const {
  loginServices,
  refreshServices,
  registerServices,
  logoutServices,
} = require('../../services/auth.services');

const handleRegister = async (req, res) => {
  try {
    const user = await registerServices({ ...req.body });
    res.status(200).json({ ...user });
  } catch (exection) {
    res.status(500).json({ message: exection.toString() });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { message, codeNum, user, accessToken, roles } = await loginServices({
      ...req.body,
    });
    if (user) {
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'strict',
      });
    }
    res.status(200).json({ message, codeNum, user, roles, accessToken });
  } catch (exection) {
    res.status(500).json({ message: exection.toString() });
  }
};

const handleRefresh = async (req, res) => {
  try {
    const { accessToken, roles, user, codeNum, message } = refreshServices(req);
    res.status(200).json({ message, codeNum, user, roles, accessToken });
  } catch (exection) {
    res.status(500).json({ message: exection.toString() });
  }
};

const handleLogout = async (req, res) => {
  try {
    const { codeNum, message } = logoutServices(res);
    res.status(200).json({ message, codeNum });
  } catch (exection) {
    res.status(500).json({ message: exection.toString() });
  }
};

const authCtrl = { handleRegister, handleLogin, handleRefresh, handleLogout };

module.exports = authCtrl;
