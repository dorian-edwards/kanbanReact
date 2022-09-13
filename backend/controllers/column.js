const catchAsync = require('../utils/catchAsync')

exports.createColumn = catchAsync(async (req, res, next) => {
  res.send('creatting a column for', req.user.id)
})

exports.getColumn = catchAsync(async (req, res, next) => {
  res.send('Get a column for', req.user.id)
})
