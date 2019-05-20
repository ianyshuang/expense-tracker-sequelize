// 初始設定
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// sequelize 資料庫物件
const db = require('./models')
const User = db.User
const Expense = db.Expense

// 載入套件
const bodyParser = require('body-parser')
const path = require('path')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 設置 template engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// 設定靜態檔案路徑
app.use(express.static(path.join(__dirname, 'public')))

// 使用 middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(flash())




// // 將 template 會用到的資料放進 res.locals
// app.use((req, res, next) => {
//   res.locals.user = req.user
//   res.locals.isAuthenticated = req.isAuthenticated()
//   res.locals.success_msg = req.flash('success_msg')
//   res.locals.warning_msg = req.flash('warning_msg')
//   res.locals.error_msg = req.flash('error_msg')
//   next()
// })

// 路由
app.use('/', require('./routes/home'))
app.use('/record', require('./routes/record'))
app.use('/user', require('./routes/user'))
app.use('/auth', require('./routes/auth'))
app.use('/filter', require('./routes/filter'))

app.listen(port, () => {
  console.log(`Express server is listening on http://localhost:${port}`)
})