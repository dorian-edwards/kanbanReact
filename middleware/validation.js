const { body } = require('express-validator')

// for checking our initial registration
const registration = [
  body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Please enter a valid email address'),
  body('username')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter a username'),
  body('password')
    .trim()
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters long'),
]

module.exports = { registration }
