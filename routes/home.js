const express = require('express')
const router = express.Router()
const db = require('../models')
const User = db.User
const Expense = db.Expense
const { authenticated } = require('../config/auth')

// 顯示所有支出
router.get('/', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) return res.error()
      Expense.findAll({ where: { userId: req.user.id } })
        .then(expenses => {
          let totalAmount = 0
          expenses.forEach(expense => {
            totalAmount += expense.amount
          })
          res.render('index', { expenses, totalAmount })
        })
    })
    .catch(err => res.status(422).json(err))
})

module.exports = router