const jwt = require('jsonwebtoken');

/**
 * @param {*} data Payload
 * @returns token
 */
const generateToken = (data) => {
  try {
    const tokens = jwt.sign(data, process.env.JWT_KEY, { expiresIn: '1h' });
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
  } catch (e) {
    console.log(e.toString());
  }
};

const checkToken = (req, res, next) => {
  const byPassURL = ['/', '/auth/register', '/auth/login', '/group'];
  if (byPassURL.includes(req.path)) {
    return next();
  }

  const token = req?.cookies?.accessToken;
  if (token) {
    const decoded = verifyToken(token);
    req.user = decoded;
    req.token = token;
    if (decoded) {
      next();
    } else {
      res.status(401).json({ message: 'Permission denined', codeNum: 0 });
    }
  } else {
    res.status(401).json({ message: 'Permission denined', codeNum: 0 });
  }
};

const checkPermission = (req, res, next) => {
  if (req?.user) {
    const roles = req?.user?.roles.Roles;
    const currentUrl = req.path;

    if (!roles || roles.length === 0) {
      res.status(403).json({
        message: 'You dont have permission',
        codeNum: 0,
      });
    }

    const canAccess = roles.some((item) => item?.url === currentUrl);
    if (canAccess) {
      next();
    } else {
      res.status(403).json({
        message: 'You dont have permission',
        codeNum: 0,
      });
    }
  } else {
    res.status(401).json({
      message: 'Not found user',
      codeNum: 0,
    });
  }
};

module.exports = { generateToken, verifyToken, checkToken, checkPermission };
