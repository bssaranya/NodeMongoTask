const syllabus = require('../../models/syllabus');
const course = require('../../models/course');

const getSyllabus = async (req, res, next) => {
  const page = req.query.p || 0;
  const perPage = 2;
  const data = await syllabus.aggregate([
    {
      $lookup: {
        from: 'courses',
        localField: 'course_id',
        foreignField: '_id',
        as: 'course_details',
      },
    },
    { $unwind: { path: '$course_details', preserveNullAndEmptyArrays: true } },
    {
      $project: { __v: 0, 'course_details.__v': 0 },
    },
    {
      $skip: page * perPage,
    },

    {
      $limit: perPage,
    },
  ]);
  res.json({
    data: data,
  });
};

const addSyllabus = async (req, res, next) => {
  const id = await course.findById(req.body.course_id);
  console.log(req.body);
  if (!id) {
    res.json({ Error: 'Check course id' });
  } else {
    await syllabus.create(req.body);
    res.json({ msg: 'success' });
  }
};

const editSyllabus = async (req, res, next) => {
  syllabus.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    if (err) {
      res.json({
        success: false,
        msg: "Id dosn't exist",
      });
    } else {
      res.json({
        success: true,
        msg: 'edited Succesfully',
      });
    }
  });
};

//view
const viewSyllabus = (req, res, next) => {
  syllabus.findById(req.query.id, (err, data) => {
    if (!err) {
      res.json({
        data,
      });
    } else {
      res.json({
        status: false,
        message: "Id dosn't exist",
      });
    }
  });
};

const deleteSyllabus = async (req, res, next) => {
  syllabus.findByIdAndDelete(req.params.id, (err) => {
    if (!err) {
      res.json({
        status: true,
        message: 'Record Deleted',
      });
    } else {
      res.json({
        status: false,
        message: "Id dosn't exist",
      });
    }
  });
};

module.exports = {
  getSyllabus,
  addSyllabus,
  editSyllabus,
  viewSyllabus,
  deleteSyllabus,
};
