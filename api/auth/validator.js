const Joi = require('joi');

const userValidationSchema = async (req, res, next) => {
  const userSchema = Joi.object({
    first_name: Joi.string().alphanum().min(2).max(20).required(),
    email: Joi.string().email().required(),
    // password: Joi.string()
    //   .min(6)
    //   .max(20)
    //   .pattern(
    //     new RegExp(
    //       '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    //     )
    //   )
    //   .required(),
    salt: Joi.string(),
    accessToken: Joi.string(),
  });

  try {
    req.body = await userSchema.validateAsync(req.body);
    next();
  } catch (err) {
    res.json({ status: 'failed', err: err.message });
  }
};

module.exports = { userValidationSchema };
