const { default: mongoose } = require('mongoose');
const course_id = require('../../models/course');
const students = require('../../models/student');

const addStudent = async (req, res) => {
  const id = await course_id.findById(req.body.course_id);
  console.log(req.body);
  if (!id) {
    res.json({ Error: 'Check course id' });
  } else {
    const s = await students.create(req.body);
    res.json({
      success: true,
      msg: 'Added Successfully',
    });
  }
};

// const listStudent = async (req, res, next) => {
//   const page = req.query.p || 0;
//   const perPage = 2;

//   let obj = {};

//   let url = req.query;

//   if (url.id) obj._id = url.id;
//   if (url.startDate && !url.end_date)
//     obj.startDate = {
//       $gte: new Date(
//         new Date(url.startDate).setHours(0, 0, 0, 0)
//       ).toISOString(),
//     };
//   if (url.end_date && !url.startDate)
//     obj.end_date = {
//       $lte: new Date(
//         new Date(url.end_date).setHours(11, 59, 59, 59)
//       ).toISOString(),
//     };
//   if (url.startDate && url.end_date)
//     obj.startDate = {
//       $gte: new Date(
//         new Date(url.startDate).setHours(0, 0, 0, 0)
//       ).toISOString(),
//       $lte: new Date(
//         new Date(url.end_date).setHours(11, 59, 59, 59)
//       ).toISOString(),
//     };
//   if (url.course_id) obj.course_id = url.course_id;
//   if (url.first_name) obj.first_name = { $regex: '.*' + url.first_name + '.*' };
//   console.log(obj);
//   let data = Object.keys(obj).length
//     ? await students
//         .find(obj)
//         .populate('course_id')
//         .skip(page * perPage)
//         .limit(perPage)
//     : await students
//         .find({})
//         .select({
//           _id: 0,
//           first_name: 1,
//           last_name: 1,

//           start_date: 1,
//           course_id: 1,
//         })
//         .populate('course_id')
//         .skip(page * perPage)
//         .limit(perPage);

//   res.json(data);
// };
//=================aggrgrate==============

const listStudent = async (req, res, next) => {
  const page = req.query.p || 0;
  const perPage = req.query.per_page || 10;
  let obj = [
    {
      $lookup: {
        from: 'syllabuses',
        localField: 'course_id',
        foreignField: 'course_id',
        as: 'syllabus_info',
      },
    },
    { $unwind: { path: '$syllabus_info', preserveNullAndEmptyArrays: true } },
    {
      $skip: page * perPage,
    },

    {
      $limit: perPage,
    },
    // { $project: { 'syllabus_info._id': 1 } },
  ];

  if (req.query._id) {
    obj = [
      ...obj,
      {
        $match: { 'syllabus_info._id': mongoose.Types.ObjectId(req.query._id) },
      },
    ];
  }

  let data = await students.aggregate(obj);
  // {
  //   $lookup: {
  //     from: 'courses',
  //     localField: 'course_id',
  //     foreignField: '_id',
  //     as: 'courses_info',
  //   },
  // },
  // { $unwind: { path: '$courses_info', preserveNullAndEmptyArrays: true } },
  // {
  //   $project: {
  //     _id: 0,
  //     course_name: '$courses_info.name',
  //     first_name: 1,
  //     last_name: 1,
  //     age: 1,
  //     startDate: 1,
  //     marks: 1,
  //     extra_score: 1,
  //   },
  // },
  // {
  //   $addFields: {
  //     Total_marks: { $sum: '$marks' },
  //   },
  // },
  // {
  //   $addFields: {
  //     grand_total: { $sum: ['$Total_marks', '$extra_score'] },
  //   },
  // },
  // {
  //   $addFields: {
  //     remarks: {
  //       $cond: {
  //         if: { $gte: ['$grand_total', 350] },
  //         then: 'pass',
  //         else: 'fail',
  //       },
  //     },
  //   },
  // },

  // {
  //   $sort: {
  //     [req.query.sort]: req.query.order ? parseInt(req.query.order) : 1,
  //   },
  // },
  // {
  //   // $group: {
  //   //   _id: '$remarks',

  //   //   students: { $firstN: { input: '$marks', n: 2 } },
  //   // },
  //   $group: {
  //     _id: '$remarks',
  //     students: { $first: '$$ROOT' },
  //   },
  // },
  // {
  //   $skip: page * perPage,
  // },

  // {
  //   $limit: perPage,
  // },

  res.json(data);
};

//====================== demo=====================
// const filter = async (req, res, next) => {
//   var obj = {};
//   let url = req.query;
//   var filter = {};

//   if (url.course_id) obj.course_id = url.course_id;
//   if (url.first_name) obj.first_name = { $regex: '.*' + url.first_name + '.*' };

//   if (url.start_date) {
//     filter = { $gte: new Date(req.query.start_date) };
//   }
//   if (url.end_date) {
//     filter = { ...filter, $lt: new Date(req.query.end_date) };
//   }
//   console.log(filter);
//   students.find({ ...obj, start_date: filter }, (err, data) => {
//     console.log(data);
//     res.json(data);
//   });
// };

module.exports = {
  addStudent,
  listStudent,
  // filter,
};
