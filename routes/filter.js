const express = require('express')
const router = express.Router()

// router.post('/', (req, res) => {
//   const month = req.body.month
//   const category = req.body.category ? req.body.category : { $exists: true }
//   let totalAmount = 0
//   Record.find({ userId: req.user._id, category }, (err, records) => {
//     if (err) return err
//     if (req.body.month) {
//       records = records.filter(record => {
//         return Number(record.date.getMonth()) + 1 === Number(month)
//       })
//     }
//     for (let record of records) {
//       totalAmount += record.amount
//     }
//     res.render('index', { records, totalAmount, monthSelected: req.body.month, categorySelected: req.body.category })
//   })
// })

module.exports = router