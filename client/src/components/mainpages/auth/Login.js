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
            const res = await axios.post('/user/login', { ...user })

            localStorage.setItem('firstLogin', true)
            localStorage.removeItem('token');
            localStorage.setItem('token', res.data.accesstoken);

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

                <div className="py-3 d-flex flex-row">
                    {/* <button className="btn btn-outline-dark " type="submit">Login</button>
                    <p className="or">OR</p>
                    <button className="btn btn-outline-dark " type="submit"><Link to="/register" className="link">Register</Link></button> */}


                    <div>

                        <button className="btn btn-outline-dark " type="submit">Login</button>

                    </div>
                    <p className="or">OR</p>
                    <div>

                        <button className="btn btn-outline-dark " type="submit"><Link to="/register" className="link">Register</Link></button>
                    </div>
                    {/* <Link to="/register">Register</Link> */}
                </div>
            </form>
        </div>
    )
}
