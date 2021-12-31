require('./models/User')
require('./models/Track')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middlewares/requireAuth')
const { DB_USER, DB_PASS, PORT } = require('./config/config')

const app = express()

app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongoUri =
  `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.mzec1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

// since mongoose v6.x useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options.
// migration note https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
mongoose.connect(mongoUri)

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance')
})
mongoose.connection.on('error', (err) => {
  console.log('Error connecting to mongo', err)
})

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`)
})

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`)
})
