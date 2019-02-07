const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
const bodyParser = require('body-parser')
const path = require('path')
require('./models/User')
require('./models/Survey')
require('./services/passport')

mongoose.connect(keys.mongoURI)

const app = express()

app.use(bodyParser.json())
const days30 = 30 * 24 * 60 * 60 * 1000
app.use(
  cookieSession({
    maxAge: days30,
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)
require('./routes/surveyRoutes')(app)

if (process.env.NODE_ENV === 'production') {
  // Express will serve production asses
  // like main.js file, or main.css
  app.use(express.static('client/build'))

  // Express will serve indext.html file
  // if it doesn't recognize route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT)
