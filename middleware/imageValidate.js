const multer = require('multer');

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, './public/images');
  },
  filename: (request, file, callback) => {
    callback(null, file.originalname);
  },
});

const imageValidate = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|pdf)$/)) {
      return cb(null, false, (req.fileValidationError = true));
    }
    // console.log(req.files.length);
    if (req.files) {
      if (req.files.length > 5) {
        return cb(null, false, (req.lengthValidationError = true));
      }
    }
    cb(undefined, true);
  },
});

module.exports = imageValidate;
