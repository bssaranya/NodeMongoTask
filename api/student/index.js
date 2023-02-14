var express = require('express');
var router = express.Router();
const students = require('../../models/student');
const controller = require('./controller.js');
/* GET users listing. */
router.get('/', controller.listStudent);
// router.get('/filter', controller.filter);

// Add
router.post('/add', controller.addStudent);

module.exports = router;
