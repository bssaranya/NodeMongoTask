const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const syllabus = new Schema({
  syllabus_code: String,
  course_id: {
    type: ObjectId,
    ref: 'courses',
  },
  duration: Number,
  syllabus: Array,
});
syllabus.index({ course_id: 1 }, { unique: true });

module.exports = mongoose.model('syllabus', syllabus);
