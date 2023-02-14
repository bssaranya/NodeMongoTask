const mongoose = require('mongoose');
const { Schema } = mongoose;

const images = new Schema(
  {
    // name: {
    //   type: String,

    //   required: true,
    // },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('images', images);
