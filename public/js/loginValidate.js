const emailField = document.getElementById('email')
const passwordField = document.getElementById('password')
// 使用正則表達式來儲存 email 的格式
const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

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
  return true
}

function addInvalid(inputField, feedbackField, feedbackMessage) {
  inputField.classList.add('is-invalid')
  feedbackField.textContent = feedbackMessage
  feedbackField.classList.add('invalid-feedback')
}

function removeInvalid(inputField) {
  inputField.classList.remove('is-invalid')
  inputField.classList.add('is-valid')
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
  if (event.target.value === '') {
    addInvalid(passwordField, passwordField.nextElementSibling, '密碼不為空！')
  } else if (event.target.value.includes(' ')) {
    addInvalid(passwordField, passwordField.nextElementSibling, '密碼不包含空白！')
  } else if (event.target.value.length < 6) {
    addInvalid(passwordField, passwordField.nextElementSibling, '密碼至少為6位數！')
  } else {
    removeInvalid(passwordField)
  }
})