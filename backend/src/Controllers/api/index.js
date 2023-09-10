const { register } = require('../../Services/api.services');

const handleRegister = async (req, res) => {
  try {
    const user = await register({ ...req.body });
    res.status(200).json({ ...user });
  } catch (exection) {
    res.status(500).json({ message: exection });
  }
};

const apiCtrl = { handleRegister };

module.exports = apiCtrl;
