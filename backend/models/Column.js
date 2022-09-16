const { Schema, model } = require('mongoose')

const columnSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  boardID: Schema.Types.ObjectId,
  tasks: [Schema.Types.ObjectId],
})

module.exports = model('Column', columnSchema)

//  Look into mongoose lean :-/
