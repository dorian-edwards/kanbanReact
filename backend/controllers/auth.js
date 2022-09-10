const { validationResult } = require('express-validator')
const catchAsync = require('../utils/catchAsync')
const User = require('../models/User')

const login = catchAsync(async (req, res, next) => {
  console.log(req.body)
  res.send('login')
})

const logout = catchAsync(async (req, res, next) => {
  res.send('Logout')
})

const create = catchAsync(async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      message: errors.array(),
    })
  }

  const { email, username, password } = req.body

  const existingUser = await User.findOne({ email, username })

  if (existingUser) {
    console.log(existingUser)
    return res.status(400).json({
      status: 'Fail',
      errors: 'Email and/or username already in use',
    })
  }

  const newUser = new User({ ...req.body })
  const results = await newUser.save()

  return res.status(201).json({
    status: 'Success',
    data: {
      id: results.id,
      username: results.username,
      email: results.email,
    },
  })
})

const getUser = catchAsync(async (req, res, next) => {
  if (req.user) return res.send(req.user)

  return res.send('No active user')
})

module.exports = {
  getUser,
  login,
  logout,
  create,
}
