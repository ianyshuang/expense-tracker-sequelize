// 初始設置
const express = require('express')
const router = express.Router()

// 載入套件
const bcrypt = require('bcryptjs')

// 載入 model 物件
const db = require('../models')
const User = db.User
const Expense = db.Expense


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res, next) => {

})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password } = req.body
  User.findOne({ where: { email } })
    .then(user => {
      if (user) {
        res.redirect('/user/register')
      } else {
        bcrypt.genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => {
            return User.create({
              name,
              email,
              password: hash
            })
          })
          .then(user => res.redirect('/'))
          .catch(err => res.status(422).json(err))
      }
    })
})

router.get('/logout', (req, res) => {

})

module.exports = router