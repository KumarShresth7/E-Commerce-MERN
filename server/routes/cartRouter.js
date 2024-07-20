const express = require('express')
const router = express.Router()
const {
    getCart,
    addToCart,
    deleteFromCart
} = require('../controllers/cartController')
const auth = require('../middleware/auth')

router.get('/',auth,getCart)
router.post('/add',auth,addToCart)
router.post('/remove',auth,deleteFromCart)

module.exports = router