const { Schema, model, SchemaType } = require('mongoose')

const boardSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  userID: Schema.Types.ObjectId,
  columns: [Schema.Types.ObjectId],
})

module.exports = model('Board', boardSchema)
