var express = require('express');
var router = express.Router();
const courses = require('../../models/course');
const controller = require('./controller.js');
/* GET users listing. */
router.get('/', controller.listCourse);


// Add
router.post('/add', controller.addCourse);



module.exports = router;
