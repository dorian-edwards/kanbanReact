const { Schema, model } = require('mongoose')

const subtaskSchema = new Schema({
  content: {
    type: String,
    unique: true,
    required: true,
  },
  complete: Boolean,
  parentTask: Schema.Types.ObjectId,
})

module.exports = model('Subtask', subtaskSchema)
