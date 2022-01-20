import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import './products.css'

export default function Filters() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search

    const [isAdmin] = state.userAPI.isAdmin


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }


    const adminRouter = () => {
        return (
            <>
                <div className="row">
                    <div className="create-pro col  ">
                        <Link class="create-link " to="/create_product"><i class="fas fa-plus-circle ">  </i>
                        Create Product</Link>
                    </div>
                    {/* <div className="col"></div>
                    <div className="col"></div> */}
                    <div className="create-pro col  ">
                        <Link class="create-link" to="/category"><i class="far fa-list-alt"></i>
                        Categories</Link>
                    </div>
                </div>
            </>
        )
    }


    return (
        <>
            <div className="top-pro text-center pt-4">
                <h1>TOP PRODUCTS</h1>
                <hr />
            </div>

            <div className="filter_menu row">
                <div className="col">
                    {/* <span>Filters: </span> */}

                    <select className="filter" name="category" value={category} onChange={handleCategory} >
                        <option value=''>All Products </option>

                        {
                            categories.map(category => (
                                <option value={"category=" + category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>


                </div>






                {/* <ul class="nav nav-pills">
                <li class="nav-item" name="category" value={category} onChange={handleCategory}>
                    <p class="nav-link active" value=''>All Products</p>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li>
            </ul> */}


                {/* <div className="filter_menu">
            <div className="row">
                <span>Filters: </span>
                <div onChange={handleCategory} >

                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </div>
            </div> */}



                {/* <input type="text" value={search} placeholder="Enter your search!"
                onChange={e => setSearch(e.target.value.toLowerCase())} /> */}

                <div className="col sort">
                    {/* <span>Sort By: </span> */}
                    <select value={sort} onChange={e => setSort(e.target.value)} >
                        <option value=''>Newest</option>
                        <option value='sort=oldest'>Oldest</option>
                        <option value='sort=-sold'>Best sales</option>
                        <option value='sort=-price'>Price: Hight-Low</option>
                        <option value='sort=price'>Price: Low-Hight</option>
                    </select>
                </div>





            </div>



            {isAdmin && adminRouter()}

        </>
    )
}
