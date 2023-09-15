const jwt = require('jsonwebtoken');

/**
 * @param {*} data Payload
 * @returns token
 */
const generateToken = (data) => {
  try {
    const tokens = jwt.sign(data, process.env.JWT_KEY, { expiresIn: '3m' });
    return tokens;
  } catch (error) {
    console.log('🚀 ~ generateToken ~ error:', error);
  }
};

/**
 * @param {*} token userTokens
 * @returns data
 */
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return decoded;
  } catch (error) {
    console.log('🚀 ~ verifyToken ~ error:', error);
  }
};

const checkToken = (req, res, next) => {
  const token = req.cookies?.accessToken;
  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      next();
    } else {
      res.status(401).json({ message: 'Permission denined', codeNum: 0 });
    }
  } else {
    res.status(401).json({ message: 'Permission denined', codeNum: 0 });
  }
};

module.exports = { generateToken, verifyToken, checkToken };
