const Joi = require('joi');

const syllabusPost = async (req, res, next) => {
  const syllabusSchema = Joi.object({
    syllabus_code: Joi.string().alphanum().required(),
    course_id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    duration: Joi.number().required(),
    syllabus: Joi.array().items(Joi.string()).required(),
  });

  try {
    req.body = await syllabusSchema.validateAsync(req.body);
    next();
  } catch (err) {
    res.json({ status: 'failed', err: err.message });
  }
};

module.exports = { syllabusPost };
