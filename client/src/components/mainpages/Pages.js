import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import Products from './products/Products'
import DetailProduct from './detailProduct/DetailProduct'
import Login from './auth/Login'
import Register from './auth/Register'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import Cart from './cart/Cart'
import NotFound from './utils/not_found/NotFound'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'
import Header from '../header/Header'
import Popular_Product from '../popular-product/Popular_Product'
import { SliderData } from '../popular-product/SliderData'
import Banner from '../banner/Banner'
import Footer from '../footer/Footer'

import { GlobalState } from '../../GlobalState'

export default function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    return (
        <>

            <Switch>
                <Route exact path="/"  >
                    <Header />
                    <Popular_Product slides={SliderData} />

                    {/* <Banner /> */}

                    <Route path="/" exact component={Products} />



                </Route>


                <Route path="/detail/:id" exact component={DetailProduct} />


                <Route path="/login" exact component={isLogged ? NotFound : Login} />
                <Route path="/register" exact component={isLogged ? NotFound : Register} />

                <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
                <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
                <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />

                <Route path="/history" exact component={isAdmin ? OrderHistory : NotFound} />
                <Route path="/history/:id" exact component={isAdmin ? OrderDetails : NotFound} />

                <Route path="/cart" exact component={Cart} />


                <Route path="*" exact component={NotFound} />
            </Switch>
        </>
    )
}