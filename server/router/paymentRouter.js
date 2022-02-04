const router = require('express').Router()
const paymentController = require('../controllers/paymentController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/payment')
    .get(auth, authAdmin, paymentController.getPayments)
    .post(auth, paymentController.createPayment)

router.route('/payment/delivery')
    .post(auth, authAdmin, paymentController.confirmDelivery)


module.exports = router
