const express = require('express')
const passport = require('passport')
const authController = require('../controllers/auth')
const validation = require('../middleware/validation')
const router = express.Router()

router.get('/user', authController.getUser)
router.post('/login', passport.authenticate('local'), authController.login)
router.post('/register', validation.registration, authController.create)
router.delete('/logout', authController.logout)

module.exports = router
