import { React, useContext, useState, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import PaypalButton from './PaypalButton';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)


    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(total)
        }

        getTotal()


    }, [cart])

    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', { cart }, {
            headers: { Authorization: token }
        })
    }

    const tranSuccess = async (payment) => {

        const { paymentID, address } = payment;

        await axios.post('/api/payment', { cart, paymentID, address }, {
            headers: { Authorization: token }
        })

        setCart([])
        addToCart([])
        alert("You have successfully placed an order.")

    }

    console.log("cart : ", cart);
    return (
        <div className='container'>
            <div >
                <h2 className=' mb-5'>ORDER ITEM</h2>
                {
                    cart.map(product => (
                        <div className='  d-flex ' >
                            <h5 className='pe-5'>{product.title}  </h5>
                            <p className='px-5'>
                                {product.quantity} * &#2547; {product.price} = &#2547; {product.price * product.quantity}
                            </p>
                        </div>

                    ))
                }
            </div>
            <hr></hr>
            <h1>Total : {total}</h1>
            <hr></hr>
            <h2 className=' my-3'>Place order</h2>
            <PaypalButton
                total={total}
                tranSuccess={tranSuccess} />
            {/* <PaypalButton
                total={total}
                tranSuccess={tranSuccess} /> */}

        </div>);
}

export default PlaceOrder;

