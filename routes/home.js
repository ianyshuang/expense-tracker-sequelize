const express = require('express')
const router = express.Router()

// 顯示所有支出
router.get('/', (req, res) => {
  res.send('顯示所有支出')
})

module.exports = router