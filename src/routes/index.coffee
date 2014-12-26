express = require('express')
router = express.Router()

### GET home page. ###
router.get('/', (req, res) ->
  res.render('index', {
    title: 'FlyingChat --最懂你的聊天工具'
    pretty: true
  })
)
# 登录界面
router.get('/login', (req, res) ->
  res.render('login', {
    title: 'FlyingChat -- Login'
    pretty: true
  })
)

router.post('/login', (req, res) ->
  console.log(res)
  res.send('Success')
  res.end()
)

module.exports = router
