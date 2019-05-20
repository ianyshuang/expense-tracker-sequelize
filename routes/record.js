const express = require('express')
const router = express.Router()

// 新增支出頁面
router.get('/new', (req, res) => {
})

// 新增支出動作
router.post('/', (req, res) => {

})

// 編輯支出頁面
router.get('/:id/edit', (req, res) => {

})

// 編輯支出動作 
router.put('/:id', (req, res) => {

})

// 刪除支出動作 
router.delete('/:id/delete', (req, res) => {

})

module.exports = router