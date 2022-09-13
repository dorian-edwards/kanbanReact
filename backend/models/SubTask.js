const { Schema, model } = require('mongoose')

const subtaskSchema = new Schema({
  content: {
    type: String,
    unique: true,
    required: true,
  },
  complete: Boolean,
})

module.exports = model('Subtask', subtaskSchema)
