import { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
    const [user, setuser] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token }
                    })
                    setIsLogged(true)
                    res.data.user.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    //  console.log(res)

                    setCart(res.data.user.cart)

                } catch (err) {
                    toast.warn(err.response.data.msg)
                }
            }

            getUser()

        }
    }, [token])


    useEffect(() => {
        if (token) {
            const getHistory = async () => {
                if (isAdmin) {
                    const res = await axios.get('/api/payment', {
                        headers: { Authorization: token }
                    })

                    setHistory(res.data)

                } else {

                    const res = await axios.get('/user/history', {
                        headers: { Authorization: token }
                    })

                    setHistory(res.data)
                }

            }

            getHistory()

        }
    }, [token, callback, isAdmin])


    const addCart = async (product) => {
        if (!isLogged) return alert("Please login First")

        const check = cart.every(item => {
            return item._id !== product._id
        })

        if (check) {
            setCart([...cart, { ...product, quantity: 1 }])

            await axios.patch('/user/addcart', { cart: [...cart, { ...product, quantity: 1 }] }, {
                headers: { Authorization: token }
            })

        } else {
            toast.warn("This product has been added to cart.")
        }
    }

    // <div>
    //     <ToastContainer
    //         position="top-center" />
    // </div>

    return (
        {

            isLogged: [isLogged, setIsLogged],
            isAdmin: [isAdmin, setIsAdmin],
            cart: [cart, setCart],
            addCart: addCart,
            history: [history, setHistory],
            user: [user, setuser],
            callback: [callback, setCallback]


        }


    )



}