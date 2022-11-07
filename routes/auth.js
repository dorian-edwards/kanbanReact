const router = require('../utils/router')
const passport = require('passport')
const authController = require('../controllers/auth')
const validation = require('../middleware/validation')

router.get('/user', authController.getUser)
router.post('/login', passport.authenticate('local'), authController.login)
router.post('/register', validation.registration, authController.create)
router.delete('/logout', authController.logout)

module.exports = router
