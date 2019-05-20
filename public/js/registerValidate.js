const emailField = document.getElementById('email')
const passwordField = document.getElementById('password')
const password2Field = document.getElementById('password2')
// 使用正則表達式來儲存 email 的格式
const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

function addInvalid(inputField, feedbackField, feedbackMessage) {
  inputField.classList.add('is-invalid')
  feedbackField.textContent = feedbackMessage
  feedbackField.classList.add('invalid-feedback')
}

function removeInvalid(inputField) {
  inputField.classList.remove('is-invalid')
  inputField.classList.add('is-valid')
}

function checkSubmit() {
  // email 格式不符
  if (!emailRegex.test(emailField.value)) {
    alert('email 格式不符！')
    return false
  }
  // 密碼格式不符
  if (passwordField.value === '' || passwordField.value.includes(' ') || passwordField.value.length < 6) {
    alert('密碼格式不符！')
    return false
  }
  // 密碼不一致
  if (passwordField.value !== password2Field.value) {
    alert('密碼不一致！')
    return false
  }
  return true
}

emailField.addEventListener('input', event => {
  if (event.target.value === '' || event.target.value.trim() === '') {
    addInvalid(emailField, emailField.nextElementSibling, 'email 為必填，不可空白！')
  } else if (!emailRegex.test(event.target.value)) {
    addInvalid(emailField, emailField.nextElementSibling, 'email 格式錯誤！')
  }
  else {
    removeInvalid(emailField)
  }
})

passwordField.addEventListener('input', event => {
  password2Field.value = ''
  password2Field.classList.remove('is-valid')
  password2Field.classList.remove('is-invalid')
  password2Field.nextElementSibling.textContent = ''
  if (event.target.value === '') {
    addInvalid(passwordField, passwordField.nextElementSibling, '密碼不可為空！')
  } else if (event.target.value.includes(' ')) {
    addInvalid(passwordField, passwordField.nextElementSibling, '密碼不可包含空白！')
  } else if (event.target.value.length < 6) {
    addInvalid(passwordField, passwordField.nextElementSibling, '密碼至少需為6位數！')
  } else {
    removeInvalid(passwordField)
  }
})

password2Field.addEventListener('input', event => {
  if (event.target.value === '') {
    addInvalid(password2Field, password2Field.nextElementSibling, '請再次輸入密碼！')
  }
  else if (passwordField.value !== password2Field.value) {
    addInvalid(password2Field, password2Field.nextElementSibling, '密碼不一致！')
  } else {
    removeInvalid(password2Field)
  }
})

