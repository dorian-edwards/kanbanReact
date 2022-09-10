const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

UserSchema.pre('save', async function save(next) {
  const user = this
  if (!user.isModified('password')) return next()

  const hash = await bcrypt.hash(user.password, 10)
  user.password = hash
  return next()
})

module.exports = model('User', UserSchema)
