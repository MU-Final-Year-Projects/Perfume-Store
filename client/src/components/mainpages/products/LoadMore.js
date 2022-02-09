import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import './products.css'
export default function LoadMore() {
    const state = useContext(GlobalState)
    const [page, setPage] = state.productsAPI.page
    const [result] = state.productsAPI.result

    return (
        <div className="container my-5 d-flex justify-content-center ">
            <div>
                {
                    result < page * 4 ? ""
                        : <button className='btn btn-sm  rounded-pill px-5 load-btn' onClick={() => setPage(page + 1)}>Load more...</button>
                }
            </div>

        </div>
    )
}
