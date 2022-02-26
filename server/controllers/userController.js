
const Users = require('../models/userModel');
const Payments = require('../models/paymentModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const token = require('../models/token');
const sendEmail = require('../utils/sendEmail');
const sendMail = require('../utils/sendMail');
const crypto = require("crypto");

const userController = {
    register: async (req, res) => {

        try {
            const { firstName, lastName, email, password } = req.body;

            const user = await Users.findOne({ email })

            if (user) return res.status(400).json({ msg: " email already exists." });


            if (password.length < 6)
                return res.status(400).json({ msg: "Password is at least 6 characters long." })

            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                firstName, lastName, email, password: passwordHash
            })



            // Save mongodb
            await newUser.save()




            // res.json({ msg: "register succesfull" })

            // Then create jsonwebtoken to authentication
            const accesstoken = createAccessToken({ id: newUser._id })
            const refreshtoken = createRefreshToken({ id: newUser._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                // path: '/user/refresh_token',
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7d

            })
            console.log("I am here ---> ");

            const id = newUser._id
            const url = `${process.env.BASE_URL}users/${id}/verify/${accesstoken}`;
            console.log(url, newUser.email);
            await sendMail(newUser.email, "Verify Email", url);
            res
                .status(201)
                .send({ message: "An Email sent to your account please verify" });


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    //--------------------------------

    verify: async (res, req) => {
        try {
            const user = await Users.findOne({ _id: req.params.id });
            if (!user) return res.status(400).send({ message: "Invalid link" });
            res.status(200).send({ message: "Email verified successfully" });
        } catch (error) {
            res.status(500).send({ message: "Internal Server Error" });
        }

    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "User does not exist." })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Incorrect password." })
            // if (!user.verified) return res.status(400).json({ msg: "User is not verified!." })

            // If login success , create access token and refresh token
            // res.json({ msg: "login" })
            const accesstoken = createAccessToken({ id: user._id })
            const refreshtoken = createRefreshToken({ id: user._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                // path: '/user/refresh_token',
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7d

            })

            res.json({ accesstoken });


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    //--------------------------------

    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
            return res.json({ msg: "Logged out" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    //--------------------------------

    refreshToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(400).json({ msg: "please login or register" })
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please Login or Register" })
                const accesstoken = createAccessToken({ id: user.id })
                res.json({ accesstoken })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
        // res.json({ rf_token })
    },

    getUser: async (req, res) => {
        try {
            // res.json(req.user)
            const user = await Users.findById(req.user.id).select('-password')
            const payments = await Payments.find();
            if (!user) return res.status(400).json({ msg: "User does not exist." })
            // console.log(user)
            res.json({ user: user, payments: payments });

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    // getAllUser: async (req, res) => {
    //     try {
    //         const user = await Users.find()
    //         res.json(user)
    //     } catch (err) {
    //         return res.status(500).json({ msg: err.message })
    //     }
    // },

    addCart: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id)
            if (!user) return res.status(400).json({ msg: "User does not exist." })

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                cart: req.body.cart
            })

            return res.json({ msg: "Added to cart" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    addShippingAddress: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id)
            if (!user) return res.status(400).json({ msg: "User does not exist." })

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                shippingAddress: req.body.shippingAddress
            })

            return res.json({ msg: "Added to cart" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    history: async (req, res) => {
        try {
            const history = await Payments.find({ user_id: req.user.id })

            res.json(history)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = userController