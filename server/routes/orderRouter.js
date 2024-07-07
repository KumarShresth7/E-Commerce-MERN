const express = require('express')
const router = express.Router()
const {newOrder,getOrder} = require('../controllers/orderController')
const auth = require('../middleware/auth')

router.post('/',auth,newOrder)
router.get('/myorders',auth,getOrder)

module.exports = router