const multer = require('multer');
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const imageValidate = require('../../middleware/imageValidate');

router.post('/', imageValidate.single('image'), controller.imageUpload);

router.get('/:id', controller.viewImage);

router.get('/', controller.listImage);
module.exports = router;
