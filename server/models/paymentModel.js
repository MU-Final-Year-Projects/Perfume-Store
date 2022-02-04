const mongoose = require('mongoose')


const paymentSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    paymentID: {
        type: String,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    shippingAddress: {
        type: Object
    },
    cart: {
        type: Array,
        default: []
    },

    is_deliverd: {
        type: Boolean
    },
    deliverd_at: {
        type: String

    },

    status: {
        type: Boolean
    }

}, {
    timestamps: true
})


module.exports = mongoose.model("Payments", paymentSchema)