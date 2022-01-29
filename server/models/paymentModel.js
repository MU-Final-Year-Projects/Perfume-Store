const mongoose = require('mongoose')


const paymentSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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
        type: Object,
        required: true
    },
    cart: {
        type: Array,
        default: []
    },

    is_deliverd: {
        type: Boolean,
        default: false
    },
    deliverd_at: {
        type: String,
        null: true
    },

    status: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})


module.exports = mongoose.model("Payments", paymentSchema)