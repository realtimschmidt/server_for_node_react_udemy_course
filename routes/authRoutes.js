const passport = require('passport')

module.exports = app => {
  // GoogleStrategy is also known as 'google'
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  )

  app.get('/auth/google/callback', passport.authenticate('google'))
}
