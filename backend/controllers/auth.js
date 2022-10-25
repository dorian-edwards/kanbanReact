const { validationResult } = require('express-validator')
const catchAsync = require('../utils/catchAsync')
const User = require('../models/User')

const login = catchAsync(async (req, res, next) => {
  res.send(req.user)
})

const logout = catchAsync(async (req, res, next) => {
  req.logout((err) => {
    if (err) throw err

    return res.send('User logged out')
  })
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
    return res.status(400).json({
      status: 'Fail',
      errors: 'Email and/or username already in use',
    })
  }

  const newUser = new User({ ...req.body })
  const results = await newUser.save()

  req.login(
    {
      id: results.id,
      username: results.username,
      email: results.email,
    },
    (err) => {
      if (err) throw err
      res.send(req.user)
    }
  )
})

const getUser = catchAsync(async (req, res, next) => {
  if (req.user) return res.send(req.user)

  return res.send(false)
})

module.exports = {
  getUser,
  login,
  logout,
  create,
}
