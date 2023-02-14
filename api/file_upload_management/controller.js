const fileSchema = require('../../models/fileupload');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//add
const multipleFiles = async (req, res, next) => {
  if (req.fileValidationError) {
    return res.json({ msg: 'Invalid file type' });
  }
  if (req.lengthValidationError) {
    return res.json({ msg: 'Invalid  size' });
  }
  try {
    let files = req.files.map((file) => {
      return {
        path: file.path,
        contentType: file.mimetype,
      };
    });

    const newImage = new fileSchema({ image: files });
    await newImage.save();

    res.json({
      success: true,
      message: 'file uploaded successfully',
    });
  } catch (e) {
    res.json({
      msg: e.message,
    });
  }
};

//list
const listImage = (req, res) => {
  try {
    fileSchema.find((err, data) => {
      if (!data) {
        return res.status(404).send('Data not found');
      }

      // res.set('Content-Type', 'image/jpeg');
      // res.send(image.image);
      res.json(data);
    });
  } catch (e) {
    console.log(e);
  }
};
//view
const viewImage = (req, res) => {
  try {
    fileSchema.findById(req.params.id, (err, data) => {
      if (!data) {
        return res.status(404).send('Data not found');
      }

      // res.set('Content-Type', 'image/jpeg');
      // res.send(image.image);
      res.json(data);
    });
  } catch (e) {
    console.log(e);
  }
};
module.exports = { multipleFiles, listImage, viewImage };
