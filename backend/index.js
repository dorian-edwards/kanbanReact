require('dotenv').config({ path: './config/.env' })
const app = require('./app')
const dbConnect = require('./config/database')
const PORT = process.env.PORT || 3001

dbConnect()

app.listen(PORT, () => {
  console.log(`Server running @ http://localhost:${PORT}`)
})
