const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op // 載入 Sequelize operator 物件
const db = require('../models')
const Expense = db.Expense
const { authenticated } = require('../config/auth')

router.post('/', authenticated, (req, res) => {
  const monthSelected = req.body.month
  const categorySelected = req.body.category
  // 選出該 category 的 expenses
  Expense.findAll({
    where: {
      userId: req.user.id,
      category: { [Op.like]: `%${categorySelected}%` }
    }
  })
    // 選出指定月份的 expenses
    .then(expenses => {
      // month 為空字串則回傳全部，否則依月分篩選
      if (monthSelected !== '') {
        expenses = expenses.filter(expense => {
          const month = expense.date.toISOString().slice(5, 7)
          return Number(month) === Number(monthSelected)
        })
      }
      return expenses
    })
    // 算出所有金額，並交給 template
    .then(expenses => {
      let totalAmount = 0
      expenses.forEach(expense => {
        totalAmount += expense.amount
      })
      res.render('index', { expenses, totalAmount, monthSelected, categorySelected })
    })
    .catch(err => res.status(422).json(err))
})

module.exports = router