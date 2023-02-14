const mongoose = require('mongoose');
const { Schema } = mongoose;

const courses = new Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  start_date: {
    type: Date,
    required: false,
  },
  end_date: {
    type: Date,
    required: false,
  },
});
module.exports = mongoose.model('courses', courses);
