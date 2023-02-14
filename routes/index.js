var express = require('express');
var router = express.Router();
const courseRouter = require('../api/courses/index');
const studentRouter = require('../api/student/index');
const imageRouter = require('../api/images/index');
const syllabusRouter = require('../api/syllabus/index');
const authRouter = require('../api/auth/index');
const fileRouter = require('../api/file_upload_management/index');
/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.use('/course', courseRouter);
router.use('/student', studentRouter);
router.use('/auth/images', imageRouter);
router.use('/auth/files', fileRouter);
router.use('/syllabus', syllabusRouter);
router.use('/auth', authRouter);

module.exports = router;
