const express = require('express')
const router = express.Router()
const db = require('../models')
const User = db.User
const Expense = db.Expense
const { authenticated } = require('../config/auth')

// 新增支出頁面
router.get('/new', authenticated, (req, res) => {
  res.render('new')
})

// 新增支出動作
router.post('/', authenticated, (req, res) => {
  const { name, category } = req.body
  const date = new Date(req.body.date)
  const amount = Number(req.body.amount)
  Expense.create({
    name,
    category,
    date,
    amount,
    userId: req.user.id
  })
    .then(expense => res.redirect('/'))
    .catch(err => res.status(422).json(err))
})

// 編輯支出頁面
router.get('/:id', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) return res.error()
      Expense.findOne({
        where: { id: req.params.id, userId: user.id }
      })
        .then(expense => res.render('edit', { expense }))
    })
    .catch(err => res.status(422).json(err))
})

// 編輯支出動作 
router.put('/:id', authenticated, (req, res) => {
  const { name, category } = req.body
  const date = new Date(req.body.date)
  const amount = Number(req.body.amount)
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) return res.error()
      Expense.findOne({
        where: { id: req.params.id, userId: user.id }
      })
        .then(expense => {
          expense.name = name
          expense.category = category
          expense.date = date
          expense.amount = amount
          return expense.save()
        })
        .then(expense => res.redirect('/'))
    })
    .catch(err => res.status(422).json(err))
})

// 刪除支出動作 
router.delete('/:id', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) return res.error()
      Expense.destroy({
        where: { id: req.params.id, userId: user.id }
      })
        .then(expense => res.redirect('/'))
    })
    .catch(err => res.status(422).json(err))
})

module.exports = router