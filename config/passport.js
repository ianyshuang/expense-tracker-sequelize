const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = passport => {
  // 使用 Local Strategy
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {

    }
  ))


  // 進行 serialize
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  // 進行 deserialize
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}

