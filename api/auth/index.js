var express = require('express');
var router = express.Router();

const controller = require('./controller.js');
const { userValidationSchema } = require('./validator');

router.post('/signup', controller.addUser);

// Add
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.post('/forgotpassword', controller.forgotPassword);
router.post(
  '/resetpassword/:accessToken',

  controller.resetPassword
);

module.exports = router;
