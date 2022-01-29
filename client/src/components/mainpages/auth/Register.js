import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './login.css'
import { use } from 'bcrypt/promises'

function Register() {
    const [user, setUser] = useState({
        firstName: '', lastName: '', email: '', mobile: '', password: '', password2: ''
    })

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const registerSubmit = async e => {
        e.preventDefault()
        if (user.password != user.password2) {
            alert("Your two passwords do not match!!!!");
            return;
        }
        try {
            const res = await axios.post('/user/register', { ...user })

            localStorage.setItem('firstLogin', true)
            localStorage.removeItem('token');
            localStorage.setItem('token', res.data.accesstoken);


            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div id="signIn" className="">
            <div className="text-center mb-4"><i class="far fa-user-circle rounded-circle  "></i></div>
            <form onSubmit={registerSubmit}>

                <input type="text" name="firstName" required
                    placeholder="First Name" value={user.firstName} onChange={onChangeInput}
                    className="form-control form-control-lg mb-4 input" />

                <input type="text" name="lastName" required
                    placeholder="Last Name" value={user.lastName} onChange={onChangeInput}
                    className="form-control form-control-lg mb-4 input" />

                <input type="email" name="email" required
                    placeholder="Email" value={user.email} onChange={onChangeInput}
                    className="form-control form-control-lg mb-4 input" />

                <input type="tel" name="mobile" required
                    placeholder="01********" value={user.mobile} onChange={onChangeInput}
                    className="form-control form-control-lg mb-4 input" />

                <input type="password" name="password" required autoComplete="on"
                    placeholder="Password" value={user.password} onChange={onChangeInput}
                    className="form-control form-control-lg mb-4 input" />

                <input type="password" name="password2" required autoComplete="on"
                    placeholder="Confirm password" value={user.password2} onChange={onChangeInput}
                    className="form-control form-control-lg mb-4 input" />

                <div className=" py-3 d-flex flex-row">
                    <div>
                        <button className="btn btn-outline-dark" type=" submit">Register</button>

                    </div>
                    <p className="or">OR</p>
                    <div>
                        <button className="btn btn-outline-dark " type="submit"><Link to="/login" className="link">Login</Link></button>
                    </div>
                    {/* <Link to="/login">Login</Link> */}
                </div>
            </form>
        </div>
    )
}

export default Register