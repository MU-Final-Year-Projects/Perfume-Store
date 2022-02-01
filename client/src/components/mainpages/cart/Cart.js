import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import { Link } from 'react-router-dom'
import PaypalButton from './PaypalButton'
import './cart.css'

export default function Cart() {

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


    const increment = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                if (item.countInStock - 1 < item.quantity) {
                    alert("Out of stock");
                    return;
                }
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id => {
        if (window.confirm("Do you want to delete this product?")) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }


    // const tranSuccess = async (payment) => {

    //     const { paymentID, address } = payment;

    //     await axios.post('/api/payment', { cart, paymentID, address }, {
    //         headers: { Authorization: token }
    //     })

    //     setCart([])
    //     addToCart([])
    //     alert("You have successfully placed an order.")


    // }


    if (cart.length === 0)
        return <h2 style={{ textAlign: "center", fontSize: "5rem" }}> Empty Cart</h2>




    return (
        <div className="row mt-4 full-cart container-fluid">
            <div className='col-9'>
                <h4 className="m-4 fw-bolder ">Cart Items</h4>



                {
                    cart.map(product => (
                        <div className="row  " key={product._id}>
                            {/* detail cart */}
                            <div className='col-lg-4 d-flex justify-content-center'>
                                <img src={product.images.url} alt="" className="img-edit" />
                            </div>

                            <div className="row d-flex justify-content-between align-items-center box-detail ">
                                {/* box-detail */}



                                <h5 className='col-lg-4'>{product.title}</h5>




                                <h6 className='col-lg-4'>&#2547; {product.price} × {product.quantity} = &#2547; {product.price * product.quantity}</h6>
                                <div className="fs-4 cart-btn amount col-lg-3">
                                    <biv className=" " onClick={() => decrement(product._id)} >  <i class="fas fa-minus-circle"></i> </biv>

                                    <biv className=" " onClick={() => increment(product._id)} ><i class="fas fa-plus-circle"></i> </biv>
                                </div>

                                <div className="delete  fs-4 col-lg-1"
                                    onClick={() => removeProduct(product._id)}>
                                    <i class="far fa-trash-alt"></i>
                                </div>


                            </div>
                            <div><hr /></div>
                        </div>

                    ))
                }
            </div>
            <div className="col-3  total d-flex flex-column justify-content-center align-items-center">
                <h3 className="total-text fw-bolde mt-3 ">Total: &#2547; {total}</h3>


                <Link id="btn_view" className='btn btn-dark my-4' to='/shipping'>
                    PROCEED  <i class="fas fa-chevron-right ms-2"></i>
                </Link>

            </div>

        </div >
    )
}

{/* <Link to="#!">Payment</Link>
                <PaypalButton
                    total={total}
                    tranSuccess={tranSuccess} />
                <PaypalButton
                    total={total}
                    tranSuccess={tranSuccess} /> */}