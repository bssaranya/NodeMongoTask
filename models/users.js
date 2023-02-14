const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const users = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: false,
    },
    accessToken: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

users.statics.validatePassword = function (pass) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    pass
  );
};

users.statics.generateSalt = async function () {
  return await bcrypt.genSalt();
};

users.statics.hashPassword = async function (pass, salt) {
  return await bcrypt.hash(pass, salt);
};

users.statics.verifyPassword = async function (pass, hash, salt) {
  const hashPassword = await bcrypt.hash(pass, salt);
  if (hashPassword === hash) return true;
  else return false;
};

users.statics.generateAuthToken = function (data) {
  try {
    let expiresIn = expireIn(10);

    if (data.rememberMe) {
      console.log('entered...');
      expiresIn = expireIn(720);
    }
    console.log('', data);
    return jwt.sign(
      {
        id: data._id,
        email: data.email,
        validity: data.password.concat(data._id).concat(data.email),
      },
      process.env.JWT_SECRET,
      { expiresIn }
    );
  } catch (e) {
    console.log(e);
  }
};

const expireIn = (numDays) => {
  const dataObj = new Date();
  return dataObj.setMinutes(dataObj.getMinutes() + numDays);
};
module.exports = mongoose.model('s_users', users);
