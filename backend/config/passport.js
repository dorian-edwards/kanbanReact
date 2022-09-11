const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

module.exports = function passportConfig(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        const user = await User.findOne({ email })

        if (!user) return done(null, false)

        const match = await bcrypt.compare(password, user.password)
        return match ? done(null, user) : done(null, false)
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    return user
      ? done(null, { id: user.id, username: user.username, email: user.email })
      : done(new Error('No user found'))
  })
}
