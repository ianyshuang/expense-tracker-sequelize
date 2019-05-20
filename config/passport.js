const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

module.exports = passport => {
  // 使用 Local Strategy
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
      User.findOne({ where: { email } })
        .then(user => {
          if (!user) return done(null, false, { message: '此 email 尚未被註冊！' })
          bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (isMatch) {
                done(null, user)
              } else {
                done(null, false, { message: '密碼錯誤！' })
              }
            })
        })
        .catch(err => res.status(422).json(err))
    }
  ))


  // 進行 serialize
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  // 進行 deserialize
  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then(user => done(null, user))
      .catch(err => console.error)
  })
}

