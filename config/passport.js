const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
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
  // 使用 Facebook Strategy
  passport.use(new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK,
      profileFields: ['email', 'displayName']
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ where: { email: profile._json.email } })
        .then(user => {
          if (!user) {
            var randomPassword = Math.random().toString(36).slice(-8)
            bcrypt.genSalt(10)
              .then(salt => bcrypt.hash(randomPassword, salt))
              .then(hash => {
                return User.create({
                  name: profile._json.name,
                  email: profile._json.email,
                  password: hash
                })
              })
              .then(user => done(null, user))
          } else {
            return done(null, user)
          }
        })
        .catch(err => done(err))
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

