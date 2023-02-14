const multer = require('multer');
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const imageValidate = require('../../middleware/imageValidate');

router.post('/', imageValidate.array('file'), controller.multipleFiles);
router.get('/', controller.listImage);
router.get('/:id', controller.viewImage);

module.exports = router;
