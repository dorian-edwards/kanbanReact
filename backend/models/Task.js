const { Schema, model } = require('mongoose')

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  subtasks: [Schema.Types.ObjectId],
  status: [Schema.Types.ObjectId],
})

module.exports = model('Task', taskSchema)
