import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
function About() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [user] = state.userAPI.user

    const [detailuser, setDetailuser] = useState([''])


    useEffect(() => {

        if (params.id) {

            user.forEach(user => {
                if (user._id === params.id) setDetailuser(user)
            })
        }
    }, [params.id, user])

    if (detailuser.length === 0) return null;
    return <div>
        <p>{detailuser.name}</p>
        <div class="container">
            <div class="container px-4">
                <div class="row  d-flex justify-content-center align-items-center">
                    <div class="col-6">
                        <img src='' alt='' height={200} width={200} />
                    </div>
                    <div class="col-6">
                        <h2>ABOUT</h2>
                        <div className="details ">
                            <label>User Id</label>
                            <p>11000000100101010</p>
                        </div>

                        <div className="details ">
                            <label>Name::</label>
                            <p></p>
                        </div>

                        <div className="details ">
                            <label>Email::</label>
                            <p>tamima@gmail.com</p>
                        </div>

                        <div className="details ">
                            <label>phone::</label>
                            <p>1019101091</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default About;
