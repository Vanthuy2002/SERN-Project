const {
  loginServices,
  registerServices,
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
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.status(200).json({ message, codeNum, user, roles, accessToken });
  } catch (exection) {
    res.status(500).json({ message: exection.toString() });
  }
};

const authCtrl = { handleRegister, handleLogin };

module.exports = authCtrl;
