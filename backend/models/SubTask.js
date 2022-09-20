const { Schema, model } = require('mongoose')

const subtaskSchema = new Schema({
  content: {
    type: String,
    unique: true,
    required: true,
  },
  complete: Boolean,
  parentTask: { type: Schema.Types.ObjectId, ref: 'Task' },
})

module.exports = model('SubTask', subtaskSchema)
