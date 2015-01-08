express = require('express')
router = express.Router()
loginCtrl = require('./../controllers/loginCtrl')

# 登录界面
router.get('/login', loginCtrl.login)

# 提交登录
router.post('/login', loginCtrl.postLogin)

module.exports = router
