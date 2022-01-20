import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './login.css'

export default function Login() {

    const [user, setUser] = useState({
        email: '', password: ''
    })

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const loginSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post('/user/login', { ...user })

            localStorage.setItem('firstLogin', true)

            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    return (
        <div id="signIn" className="signIn">
            <div className="text-center mb-4"><i class="far fa-user-circle rounded-circle  "></i></div>

            <form onSubmit={loginSubmit}>




                <input type="email" name="email" required
                    placeholder="Email" value={user.email} onChange={onChangeInput}
                    className="form-control form-control-lg mb-4 input" />


                <input type="password" name="password" required autoComplete="on"
                    placeholder="Password" value={user.password} onChange={onChangeInput}
                    className="form-control form-control-lg mb-4 input" />

                <div className="row">
                    <button className="btn btn-outline-dark " type="submit">Login</button>
                    <p className="or">OR</p>
                    <button className="btn btn-outline-dark " type="submit"><Link to="/register" className="link">Register</Link></button>
                    {/* <Link to="/register">Register</Link> */}
                </div>
            </form>
        </div>
    )
}
