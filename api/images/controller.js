const Image = require('../../models/image');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
//add
const imageUpload = async (req, res) => {
  try {
    if (req.fileValidationError) {
      res.json('Validation error');
    }
    console.log(req.file.path);
    const image = new Image({
      // name: req.body.name,
      image: req.file.path,
    });
    const newImage = new Image(image);
    await newImage.save();

    res.json('Image uploaded successfully');
  } catch (e) {
    console.log(e);
  }
};

//view
const viewImage = (req, res) => {
  try {
    Image.findById(req.params.id, (err, image) => {
      if (!image) {
        return res.status(404).send('Image not found');
      }
      console.log(image.image);

      const imageBuffer = fs.readFileSync(image.image);
      const contentType = getContentType(image.image);
      res.set('Content-Type', contentType);
      res.send(imageBuffer);
    });
    function getContentType(filePath) {
      const extname = path.extname(filePath);
      switch (extname.toLowerCase()) {
        case '.jpeg':
        case '.jpg':
          return 'image/jpeg';
        case '.png':
          return 'image/png';
        // case '.gif':
        //   return 'image/gif';
        default:
          return 'application/octet-stream';
      }
    }
    // res.json(image);
  } catch (e) {
    console.log(e);
  }
};

//list
const listImage = (req, res) => {
  try {
    Image.find((err, image) => {
      if (!image) {
        return res.status(404).send('Image not found');
      }

      // res.set('Content-Type', 'image/jpeg');
      // res.send(image.image);
      res.json(image);
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  imageUpload,
  viewImage,
  listImage,
};
