import React, { useState, useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import './category.css'
import { Link } from 'react-router-dom'

export default function Categories() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.categoriesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const createCategory = async e => {
        e.preventDefault()
        try {
            if (onEdit) {

                const res = await axios.put(`/api/category/${id}`, { name: category }, {
                    headers: { Authorization: token }
                })
                alert(res.data.msg)


            } else {
                const res = await axios.post('/api/category', { name: category }, {
                    headers: { Authorization: token }
                })
                alert(res.data.msg)
            }
            setOnEdit(false)
            setCategory('')
            setCallback(!callback)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    const editCategory = async (id, name) => {
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }


    const deleteCategory = async id => {
        try {
            const res = await axios.delete(`/api/category/${id}`, {
                headers: { Authorization: token }
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    return (
        <div className="categories row">
            <h1 className="category-p text-center py-5">Category <hr /></h1>
            <div className="col">
                <form onSubmit={createCategory}>
                    {/* <label htmlFor="category">Category</label> */}
                    <input type="text" name="category" value={category} required
                        onChange={e => setCategory(e.target.value)} />

                    <button type="submit">{onEdit ? "Update" : "Create"}</button>
                </form>
            </div>

            <div className="col">
                {
                    categories.map(category => (
                        <div className="row" key={category._id}>
                            <p>{category.name}</p>
                            <div>
                                <Link onClick={() => editCategory(category._id, category.name)} ><i class="far fa-edit  rounded-circle cart"></i></Link>
                                <Link onClick={() => deleteCategory(category._id)} ><i class="fas fa-trash-alt  rounded-circle cart"></i></Link>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}
