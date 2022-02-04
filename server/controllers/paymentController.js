const Payments = require('../models/paymentModel')
const Users = require('../models/userModel')
const Products = require('../models/productModel')


const paymentController = {
    getPayments: async (req, res) => {
        try {
            const payments = await Payments.find().sort('-createdAt')
            res.json(payments)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    confirmDelivery: async (req, res) => {
        // console.log("I am called");
        try {
            const order_id = req.body.order_id;
            const date = Date.now();
            await Payments.findOneAndUpdate({ _id: order_id }, {
                is_deliverd: true,
                deliverd_at: date
            })
        }
        catch (error) {
            console.log(error)

        }
    },
    createPayment: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('name email')
            if (!user) return res.status(400).json({ msg: "User does not exist." })
            // console.log("I Am Called");
            console.log(req.body);
            const { cart, paymentID, address, shippingAddress } = req.body;

            const { _id, firstName, email } = user;

            try {
                const newPayment = new Payments({
                    user_id: _id,
                    name: firstName,
                    email: email,
                    cart: cart,
                    paymentID: paymentID,
                    address: address,
                    shippingAddress: shippingAddress,
                    is_deliverd: false,
                    deliverd_at: '', status: false
                })
                await newPayment.save()
            }
            catch (error) {
                console.log("error : ", error);
                l
            }
            console.log("Payment successfull")



            cart.filter(item => {
                return sold(item._id, item.quantity, item.sold)
            })




            res.json({ msg: "Payment Successfull!" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

const sold = async (id, quantity, oldSold) => {
    await Products.findOneAndUpdate({ _id: id }, {
        sold: quantity + oldSold
    })
}

module.exports = paymentController
