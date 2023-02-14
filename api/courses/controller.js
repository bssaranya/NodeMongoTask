const courses = require('../../models/course');

const addCourse = async (req, res) => {
  console.log(req.body);
  const s = await courses.create(req.body);
  res.json({
    success: true,
    msg: 'Added Successfully',
  });
};
const listCourse = (req, res, next) => {
  const s = courses.find((err, data) => {
    if (err) console.log(err);
    else res.json(data);
  });
};

module.exports = {
  addCourse,
  listCourse,
};



// await students.aggregate(
//   [
//     {
//       $lookup: {
//         from: 'courses',
//         localField: 'course_id',
//         foreignField: '_id',
//         as: 'courses_info',
//       },
//     },
//     {
//       $unwind: {
//         path: 'courses_info',

//         preserveNullAndEmptyArrays: true,
//       },
//     },
//     {
//       $addFields: {
//         Total_marks: '$marks',
//       },
//     },
//     // {
//     //   $project:{_id:0,first_name:1,courses_info.name:1,marks:1,extrascore:1}
//     // },
//     {
//       $skip: page * perPage,
//     },

//     {
//       $limit: perPage,
//     },
//     {
//       $sort: { courses_info: 1 },
//     },
//   ]
