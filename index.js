const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
const authRoutes = require('./routes/authRoutes')
require('./models/user')
require('./services/passport')

mongoose.connect(keys.mongoURI)

const app = express()

const days30 = 30 * 24 * 60 * 60 * 1000
app.use(
  cookieSession({
    maxAge: days30,
    keys: [keys.cookieKey]
  })
)

authRoutes(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)
