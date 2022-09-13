const { Schema, model } = require('mongoose')

const columnSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  userID: Schema.Types.ObjectId,
  tasks: [Schema.Types.ObjectId],
})

module.exports = model('Column', columnSchema)
