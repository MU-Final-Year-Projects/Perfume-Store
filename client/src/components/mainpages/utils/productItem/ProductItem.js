import React from 'react'
import './productItem.css'
import { Link } from 'react-router-dom'
import BtnRender from './BtnRender'
import axios from 'axios'


export default function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {


    return (
        <div className="product_card">
            {
                isAdmin && <input type="checkbox" checked={product.checked}
                    onChange={() => handleCheck(product._id)} />
            }

            {/* <div id="Offer-card" className="row  ">
                <div className="col ">
                    <div className="card    "  >
                        <div className="inner">
                            <img src={product.images.url} alt="" className="card-img" />
                        </div>
                        <div className="card-body card text-center">
                            <h2 title={product.title}>{product.title}</h2>
                            <span>${product.price}</span>
                            <p>{product.description}</p>
                        </div>
                         */}


            <div className="card row ">
                <div className="inner">
                    <img src={product.images.url} alt="" className="card-img  " />
                </div>

                <div className="card-body colam text-center">
                    <h3 title={product.title}>{product.title}</h3>
                    <span>${product.price}</span>
                    {/* <p>{product.description}</p> */}
                </div>
                {/* <div className="overlay">
                    <button onClick={addToCart} className="btn "><i class="fas fa-shopping-cart rounded-circle cart"></i></button>
                </div> */}



                {/* </div>
                </div>
            </div> */}








                <div className="overlay">
                    <BtnRender product={product} deleteProduct={deleteProduct} />
                </div>
            </div>


        </div>
    )
}
