module.exports = {
  authenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    } else {
      req.flash('warning_msg', '請先登入以使用！')
      return res.redirect('/user/login')
    }
  }
}