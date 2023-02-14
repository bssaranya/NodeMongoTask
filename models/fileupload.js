const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema(
  {
    image: [
      {
        path: String,
        contentType: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('fileSchema', fileSchema);
