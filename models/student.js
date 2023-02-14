const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const students = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  start_date: {
    type: Date,
    required: false,
  },
  marks: {
    type: Array,
    required: true,
  },

  

  extra_score: { type: Number, required: true },
  course_id: {
    type: ObjectId,
    ref: 'courses',
    required: true,
  },
});
module.exports = mongoose.model('students', students);
