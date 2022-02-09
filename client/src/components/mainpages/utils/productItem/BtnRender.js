import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './productItem.css'
import { GlobalState } from '../../../../GlobalState'

export default function BtnRender({ product, deleteProduct }) {

    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart

    return (
        <div className="row_btn">

            {
                isAdmin ?
                    <>
                        <div className="">
                            <Link id="btn_buy" to="#!" onClick={() => deleteProduct(product._id, product.images.public_id)}>
                                <i class="fas fa-trash-alt  rounded-circle cart"></i>
                            </Link>

                            <Link id="btn_view" to={`/edit_product/${product._id}`}>
                                <i class="far fa-edit  rounded-circle cart"></i>
                            </Link>
                        </div>
                    </>
                    : !product.countInStock ? <p className='fx-4 fw-bold stock ps-1'>Out Of Stock</p> :
                        <>
                            <div className="overlay">
                                <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
                                    <i class="fas fa-shopping-cart rounded-circle cart"></i>
                                </Link>

                                <Link id="btn_view" to={`/detail/${product._id}`}>
                                    <i class="far fa-eye   rounded-circle cart"></i>
                                </Link>
                            </div>
                        </>

            }
            {/* <Link id="btn_buy" to="#!" 
                    onClick={() =>deleteProduct(product._id, product.images.public_id)}>
                        Delete
                    </Link>
                    <Link id="btn_view" to={`/edit_product/${product._id}`}>
                        Edit
                    </Link> */}

            {/* <Link id="btn_buy" to="#!" >
                Buy
                    </Link>
            <Link id="btn_view" to={`/detail/${product._id}`}>
                VIEW
                    </Link> */}

            {/* // <div className="">
                //     <Link id="btn_buy" to="#!">
                    //         <button className="btn "><i class="fas fa-shopping-cart rounded-circle cart"></i></button>
            //     </Link>

            //     <Link id="btn_view" to={`/detail/${product._id}`}>
                    //         VIEW
            //                 </Link>
            // </div> */}



        </div>
    )
}
