import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
// import './products.css'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'
import Banner from '../../banner/Banner'
import Footer from '../../footer/Footer'
import Pagination from './Pagination'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Products() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)



    const handleCheck = (id) => {
        products.forEach(product => {
            if (product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

    const deleteProduct = async (id, public_id) => {

        try {
            const destroyImg = axios.post('/api/destroy', { public_id }, {
                headers: { Authorization: token }
            })

            const deleteProduct = axios.delete(`/api/products/${id}`, {
                headers: { Authorization: token }
            })

            await destroyImg
            await deleteProduct
            setCallback(!callback)

        } catch (err) {
            toast.success(err.response.data.msg)
        }
    }

    const checkAll = () => {
        products.forEach(product => {
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const deleteAll = () => {
        products.forEach(product => {
            if (product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }

    if (loading) return <div><Loading /></div>

    return (
        <>
            <Filters />
            {/* {
                isAdmin &&
                <div className="delete-all">
                    <span>Select all</span>
                    <input type="checkbox" checked={isCheck} onChange={checkAll} />
                    <button onClick={deleteAll}>Delete ALL</button>
                </div>
            } */}



            {/* //------------------------------------------ */}
            <div className="container-fluid ">
                <div className="row">
                    {
                        products.map(product => {
                            return (
                                <>
                                    <div className="col-3">
                                        <ProductItem key={product._id} product={product} deleteProduct={deleteProduct} />
                                        {/* s */}
                                    </div>
                                </>
                            )
                        })
                    }
                </div>


            </div>
            <LoadMore />




            {/* <Pagination
                postsPerPage={postsPerPage}
                totalPosts={products.length}
                paginate={paginate}
            /> */}



            {/* {<Loading />} */}


            {/* <div >
                <Banner />
                <Footer />
            </div> */}
            <ToastContainer
                position="top-center" />
        </>


    )

}
