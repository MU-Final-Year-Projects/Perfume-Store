import React, { useState, useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'
import './navbar.css'
import navPic from '../navbar/navPic/logo.png';
import Header from '../header/Header'

export default function Navbar() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    // const [menu, setMenu] = useState(false)
    const [search, setSearch] = state.productsAPI.search
    const [history, setHistory] = state.userAPI.history


    const logoutUser = async () => {
        await axios.get('/user/logout')
        // localStorage.clear()


        localStorage.removeItem('firstLogin')

        window.location.href = "/";
    }

    const adminRouter = () => {
        return (
            <>
                {/* <li className="nav-item "><Link class="nav-link" to="/create_product">Create Product</Link></li>
                <li className="nav-item "><Link class="nav-link" to="/category">Categories</Link></li> */}
                {/* <li className="nav-item "><Link class="nav-link" to="/history"><i class="fas fa-history"></i></Link></li> */}
                <li className="nav-item "><Link class="nav-link" to="/dashboard">Dashboard</Link></li>
            </>
        )
    }

    const loggedRouter = () => {
        return (
            <>
                {/* <li className="nav-item "><Link class="nav-link" to="/hist">History</Link></li> */}
                {
                    isAdmin ? ''
                        : <li className="nav-item "><Link class="nav-link" to="/about"><i class="fas fa-user  rounded-circle"></i> <p className="logout">Profile</p></Link></li>
                }
                <li className="nav-item "><Link class="nav-link" to="/" onClick={logoutUser}><i class="fas fa-sign-out-alt"></i><p className="logout">Log-out</p></Link></li>
            </>
        )
    }


    return (
        <>
            <nav className="navbar sticky-nav navbar-expand-lg    ">
                {/* <button className="navbar-toggler  " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className=""><i class="fas fa-bars navbar-icon text-white "></i></span>
                </button> */}

                <NavLink className="navbar-brand m-auto " to="/" >
                    {/* <img src={navPic} className="nav-img " /> */}
                    <h1>{isAdmin ? <h1 className="nav-img text-dark">ADMIN</h1> : <img src={navPic} className="nav-img " />}  </h1>
                </NavLink>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

                    <ul className=" navbar-nav ms-auto ">


                        <li className="nav-item ">
                            <NavLink class="nav-link" to="#">
                                <input type="text" value={search} className=" search-input"
                                    onChange={e => setSearch(e.target.value.toLowerCase())} /><i class="fas fa-search  rounded-circle"></i>
                            </NavLink>
                        </li>
                        {/* {/* <NavLink class="nav-link" to="#"><input type="search" className=" search-input" ></input> <i class="fas fa-search  rounded-circle"></i> </NavLink>  */}



                        {/* <li className="nav-item ">
                            <NavLink class="nav-link shop" to="/">{isAdmin ? <i class="fab fa-shopify"></i> : <i class="fab fa-shopify"></i>}</NavLink>
                        </li> */}



                        {
                            isAdmin ? ''
                                : <li className="nav-item">

                                    <NavLink className="nav-link cart" to="/cart">
                                        <span className="cart-icon fs-5">{cart.length}</span> <i class="fas fa-shopping-cart rounded-circle"></i>
                                    </NavLink>
                                </li>
                        }

                        {/* <li className="nav-item">

                        <NavLink className="nav-link cart" to="/cart">
                            <span className="cart-icon">0</span> <i class="fas fa-shopping-cart rounded-circle"></i>
                        </NavLink>
                    </li> */}

                        {isAdmin && adminRouter()}

                        {
                            isLogged ? loggedRouter() : <li className="nav-item">
                                <NavLink className="nav-link" to="/login">
                                    <i class="far fa-user-circle rounded-circle"></i>
                                </NavLink>
                            </li>
                        }


                    </ul>

                </div>

            </nav>
            {/* <Header /> */}
        </>
    )
}
