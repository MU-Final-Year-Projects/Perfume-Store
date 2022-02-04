import React, { useContext, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './history.css'

export default function OrderHistory() {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

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
    }, [token, isAdmin, history])

    return (
        <div className="history-page container">
            {/* <h2>History</h2> */}

            <h4>You have {history.length} order</h4>

            <table className='table table-striped'>
                <thead>
                    <tr>

                        <th>Payment ID</th>
                        <th>Date of Purchased</th>
                        <th>Deliverd</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(items => (
                            <tr key={items._id}>
                                <td>{items.paymentID}</td>

                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td>{items.is_deliverd ? "Product Delivered" : "Pending"}</td>
                                <td><Link to={`/hist/${items._id}`}>View</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
