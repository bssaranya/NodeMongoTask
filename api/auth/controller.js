const jwt = require('jsonwebtoken');
const users = require('../../models/users');

const addUser = async (req, res) => {
  try {
    let userExist = users.find({ email: req.body.email }, async (err, data) => {
      if (data.length !== 0) {
        console.log(data);
        res.json({ success: false, message: 'user exist' });
      } else {
        console.log(userExist);
        // if (!userExist) {
        const salt = await users.generateSalt();
        req.body.password = await users.hashPassword(req.body.password, salt);
        req.body.salt = salt;
        console.log(req.body);
        await users.create(req.body);
        return res.json({
          success: true,
          message: 'created successfully',
        });
      }
    });

    // } else {
    //   return res.json({
    //     success: false,
    //     message: 'User Exist',
    //   });
    // }
  } catch (e) {
    return res.json({
      success: false,
      message: e,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: 'invalid email or password',
      });
    }

    if (!(await users.verifyPassword(password, user.password, user.salt))) {
      return res.json({
        success: false,
        message: 'invalid  password',
      });
    }
    const accessToken = await users.generateAuthToken(user);
    const refreshToken = await users.generateAuthToken(user);

    user.accessToken = accessToken;
    const newLogin = new users(user);
    let newData = await newLogin.save();

    return res.json({
      success: true,
      message: 'Logined',
      data: {
        user,
        accessToken,
        refreshToken,
      },
    });
  } catch (e) {
    return res.json({
      success: false,
      message: e,
    });
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await users.findOne({ email });
    if (!user) return res.send('User not found');

    const token = jwt.sign(
      {
        id: user._id,
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1m',
      }
    );
    const link = `http://localhost:4001/auth/resetpassword/${token}`;
    res.send(link);
  } catch (error) {
    res.status(500).send('Server error');
  }
};
const resetPassword = async (req, res, next) => {
  // try {
  const { accessToken } = req.params;
  console.log(accessToken);
  const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
  const user = await users.findById(decodedToken.id);
  if (!user) res.json({ success: false, message: 'User not exist' });
  user.password = await users.hashPassword(req.body.password, user.salt);
  const newUser = new users(user);
  const response = await newUser.save();
  return res.json({ success: true, response });
  // } catch (err) {
  //   return res.json({ success: false, message: err });
  // }
};

const logout = async (req, res, next) => {
  console.log('dshgfhdsgfhds', req.user.id);
  let data = await users.findById(req.user.id);
  data.accessToken = undefined;
  console.log(data);
  const newUser = new userModel(data);
  const bigData = await newUser.save();
  res.json(bigData);
};
module.exports = {
  addUser,
  login,
  forgotPassword,
  resetPassword,
  logout,
};
