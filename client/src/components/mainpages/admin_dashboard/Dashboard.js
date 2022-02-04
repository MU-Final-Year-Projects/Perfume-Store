import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Dashboard() {
    // const params = useParams()
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [history, setHistory] = state.userAPI.history
    // const [products] = state.productsAPI.products
    // const addCart = state.userAPI.addCart
    // const [detailProduct, setDetailProduct] = useState([])
    const [token] = state.token

    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search

    const [isAdmin] = state.userAPI.isAdmin

    // const adminRouter = () => {
    //     return (
    //         <>
    //             <div className="row">
    //                 <div className="create-pro col  ">
    //                     <Link class="create-link " to="/create_product"><i class="fas fa-plus-circle ">  </i>
    //                         Create Product</Link>
    //                 </div>
    //                 {/* <div className="col"></div>
    //                 <div className="col"></div> */}
    //                 <div className="create-pro col  ">
    //                     <Link class="create-link" to="/category"><i class="far fa-list-alt"></i>
    //                         Categories</Link>
    //                 </div>
    //             </div>
    //         </>
    //     )
    // }

    // history---
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
    }, [token, isAdmin, setHistory])
    // history---



    return (
        <>
            <div className='container'>
                <div className='row my-5'>
                    <div className='col-lg-4'>
                        <ul class="nav flex-column">
                            <li class="nav">
                                <a class="nav-link active" aria-current="page" href="/create_product">Create Product</a>
                            </li>
                            <li class="nav">
                                <a class="nav-link" href="/category">Categories</a>
                            </li>
                            <li class="nav">
                                <a class="nav-link" href="/hist">Order History</a>
                            </li>
                            {/* <li class="nav">
                                <a class="nav-link " href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                            </li> */}
                        </ul>

                    </div>

                    <div className='col-lg-4 text-center'>
                        <div className='border'>
                            <h1> Order</h1>
                            <span>{history.length}</span>

                        </div>
                    </div>

                    {/* <div className='col-lg-4'>
                        <div className='border'>
                            <h1> Order</h1>
                            <span>detailProduct.length</span>

                        </div>
                    </div> */}

                </div>
                {/* {isAdmin && adminRouter()} */}
            </div>
        </>
    )
}

export default Dashboard
