const jwt = require('jsonwebtoken');
const users = require('../models/users');

module.exports = async (req, res, next) => {
  try {
    if (req.originalUrl.startsWith('/auth')) return next();
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;

    if (!token) {
      return res.json({
        success: false,
        msg: 'Unauthorized Access',
      });
    }

    const access_Token = await users.findOne({ accessToken: token });
    if (!access_Token) {
      return res.json({
        success: false,
        msg: 'Invalid or Expired Tocken',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded ---> \n', decoded);
    if (!decoded) {
      return res.json({
        success: false,
        msg: 'Invalid Token',
      });
    }
    if (decoded.exp < Date.now()) {
      return res.json({ success: false, msg: 'Token Expired' });
    }

    const isUserExists = await users.findById(decoded.id);
    if (!isUserExists) {
      return res.json({ success: false, msg: 'Access Denied' });
    }
    let matchvalidity = isUserExists.password
      .concat(isUserExists._id)
      .concat(isUserExists.email);
    if (matchvalidity != decoded.validity) {
      return res.json({ success: false, msg: 'Access Denied' });
    }
    req.user = decoded;
    return next();
  } catch (ex) {
    console.log(ex);
    return res.json({ success: false, msg: 'Invalid Token' });
  }
};
