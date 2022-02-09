import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import OrderHistory from '../history/OrderHistory'
import axios from 'axios'
function About() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [user, setUser] = useState(null);
    const [payments, setPayments] = useState(null);
    const token = localStorage.getItem('token');

    const [detailuser, setDetailuser] = useState([''])


    useEffect(() => {

        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token }

                    })
                    setUser(res.data.user);
                    setPayments(res.data.payments);

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser();
        }
    }, [token, user, payments]);


    if (!user) return null;
    return <div>

        <div class="container">
            <div class="container  py-5">
                {/* <h4 className=''>Welcome</h4> */}


                <div className='d-flex pb-4'>
                    <div class="" height={400} width={200}>
                        {/* <img src='' alt='' height={200} width={200} /> */}

                        <i class="fas fa-user-circle  fs-1 mx-5" ></i>
                    </div>
                    <div class="">

                        {/* <i class="fas fa-user-circle fs-1 p-5 m-5"></i> */}
                        <h3>{user.firstName}  {user.lastName}</h3>
                        <p>{user.email}</p>

                    </div>
                </div>
                <div className="mt-4">
                    {/* {

                            payments && payments.map((payment, ind) => payment.user_id == user._id ?
                                <>


                                    <div className='d-flex justify-content-evenly'>
                                        <p>{payment.paymentID}</p>

                                        <p>{payment.is_deliverd ? "Deliverd" : "Not Deliverd"}</p>
                                    </div>

                                </>
                                :
                                null
                            )
                        } */}
                    <OrderHistory />

                </div>

            </div>
        </div>
    </div>;
}

export default About;
