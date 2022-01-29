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
            <div class="container px-4">
                <div class="row  d-flex justify-content-center align-items-center">
                    <div class="col-6">
                        <img src='' alt='' height={200} width={200} />
                    </div>
                    <div class="col-6">
                        <h2>ABOUT</h2>
                        {/* <div className="details ">
                            <label>User Id</label>
                            <p>11000000100101010</p>
                        </div> */}

                        <div className="details ">
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
                        </div>

                        <div className="details ">
                            <label>phone::</label>
                            <p>{user.mobile}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default About;
