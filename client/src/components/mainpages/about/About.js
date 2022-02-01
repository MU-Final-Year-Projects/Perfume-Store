import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
function About() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('token');

    const [detailuser, setDetailuser] = useState([''])


    useEffect(() => {

        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token }

                    })
                    setUser(res.data);

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser();
        }
    }, [token, user]);


    if (!user) return null;
    return <div>

        <div class="container">
            <div class="container  py-5">
                {/* <h4 className=''>Welcome</h4> */}
                <div class="  d-flex justify-content-center align-items-center">

                    <div class="" height={400} width={200}>
                        {/* <img src='' alt='' height={200} width={200} /> */}

                        <i class="fas fa-user-circle  fs-1 mx-5" ></i>
                    </div>
                    <div class="">

                        {/* <i class="fas fa-user-circle fs-1 p-5 m-5"></i> */}
                        <h3>{user.firstName}  {user.lastName}</h3>
                        <p>{user.email}</p>
                        {/* <div className="details ">
                            <label>User Id</label>
                            <p>11000000100101010</p>
                        </div> */}

                        {/* <div className="details ">
                            <label>FirstName:: </label>
                            <p>{user.firstName}</p>
                        </div>

                        <div className="details ">
                            <label>LastName:: </label>
                            <p>{user.lastName}</p>
                        </div>

                        <div className="details ">
                            <label>Email::</label>
                            <p>{user.email}</p>
                        </div> */}

                        {/* <div className="details ">
                            <label>phone::</label>
                            <p>{user.mobile}</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default About;
