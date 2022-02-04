import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'

export default function OrderDetails(props) {

    const state = useContext(GlobalState)
    const [history] = state.userAPI.history

    const [isAdmin] = state.userAPI.isAdmin

    const [token] = state.token
    const [orderDetails, setOrderDetails] = useState([])
    const [isDeliverd, setIsDeliverd] = useState([]);

    const params = useParams()

    useEffect(() => {
        if (params.id) {
            history.forEach(item => {
                if (item._id === params.id) setOrderDetails(item)
            })
        }
    }, [params.id, history])
    console.log(orderDetails)

    if (orderDetails.length === 0) return null;
    const submitDelivery = (e) => {
        const order_id = orderDetails._id;
        e.preventDefault();
        const res = axios.post('/api/payment/delivery', { order_id: order_id }, {
            headers: { Authorization: token }
        })
        props.history.push('/hist');


    }

    return (
        <div className="history-page container mt-5">
            {
                !isAdmin ? null :

                    <form onSubmit={submitDelivery}>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={orderDetails.is_deliverd ? 'checked' : null} />
                            <label class="form-check-label" for="flexCheckDefault">
                                delivered
                            </label>
                        </div>
                        {
                            orderDetails.is_deliverd ? null :
                                <>
                                    <button type="submit" className="btn ">confirm</button>
                                </>
                        }
                    </form>
            }
            {/* <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Postal Code</th>
                        <th>Country Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{orderDetails.address.recipient_name}</td>
                        <td>{orderDetails.address.line1 + " - " + orderDetails.address.city}</td>
                        <td>{orderDetails.address.postal_code}</td>
                        <td>{orderDetails.address.country_code}</td>
                    </tr>
                </tbody>
            </table> */}

            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Postal Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{orderDetails.shippingAddress ? orderDetails.shippingAddress.address : null}</td>
                        <td>{orderDetails.shippingAddress ? orderDetails.shippingAddress.phone : null}</td>
                        <td>{orderDetails.shippingAddress ? orderDetails.shippingAddress.country : null}</td>
                        <td>{orderDetails.shippingAddress ? orderDetails.shippingAddress.city : null}</td>
                        <td>{orderDetails.shippingAddress ? orderDetails.shippingAddress.postalCode : null}</td>

                    </tr>
                </tbody>
            </table>

            <table className='table table-striped ' style={{ margin: "70px 0px" }}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.cart.map(item => (
                            <tr key={item._id}>
                                <td><img src={item.images.url} alt="" /></td>
                                <td>{item.title}</td>
                                <td>{item.quantity}</td>
                                <td>&#2547; {item.price * item.quantity}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}
