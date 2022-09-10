const mongoose = require('mongoose')

const URI = process.env.URI

module.exports = async function dbConnect() {
  const connection = await mongoose.connect(URI)
  console.log(`Database connected: ${connection.connection.host}`)
}
