const {
  Schema,
  Schema: {
    Types: { ObjectId },
  },
  model,
} = require('mongoose')

const subtaskSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  complete: Boolean,
  parentTask: { type: ObjectId, required: true, ref: 'Task' },
  userId: { type: ObjectId, required: true, ref: 'User' },
})

module.exports = model('Subtask', subtaskSchema)
