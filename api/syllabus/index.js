var express = require('express');
var router = express.Router();
const {
  getSyllabus,
  addSyllabus,
  editSyllabus,
  viewSyllabus,
  deleteSyllabus,
} = require('./controller');

const { syllabusPost } = require('./validator');
router.post('/add', syllabusPost, addSyllabus);
router.patch('/:id', syllabusPost, editSyllabus);
router.get('/view', viewSyllabus);
router.delete('/:id', deleteSyllabus);
router.get('/', getSyllabus);

module.exports = router;
