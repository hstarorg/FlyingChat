express = require('express')
router = express.Router()
filters = require('./../controllers/filters')
indexCtrl = require('./../controllers/indexCtrl')

### GET home page. ###
router.get('/',
 # filters.authorize,
  indexCtrl.index
)

module.exports = router
