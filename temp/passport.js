const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = passport => {
  // 使用 Local Strategy
  passport.use(new LocalStrategy({ usernameField: 'email' },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) done(err)
        if (!user) {
          return done(null, false, { message: '此 email 尚未註冊！' })
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (isMatch) {
            return done(null, user)
          } else {
            return done(null, false, { message: '密碼不正確！' })
          }
        })
      })
    }
  ))
  // 使用 Facebook Strategy
  passport.use(new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK,
      profileFields: ['email', 'displayName']
    }, (accessToken, refreshToken, profile, done) => {
      // 查找此 user 是否存在於資料庫中
      User.findOne({ email: profile._json.email }, (err, user) => {
        // 如果沒有這個 user 就新增
        if (!user) {
          var randomPassword = Math.random().toString(36).slice(-8)
          bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err
            bcrypt.hash(randomPassword, salt, (err, hash) => {
              if (err) throw err
              const newUser = new User({
                name: profile._json.name,
                email: profile._json.email,
                password: hash,
              })
              newUser.save().then(user => {
                return done(null, user)
              }).catch(err => {
                console.error(err)
              })
            })
          })
        } else {
          // 有的話就直接回傳
          return done(null, user)
        }
      })
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

