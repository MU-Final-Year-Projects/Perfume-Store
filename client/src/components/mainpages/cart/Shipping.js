import { React, useState, useContext } from 'react';
import { GlobalState } from '../../../GlobalState'
import axios from 'axios';


function Shipping({ history }) {

    const state = useContext(GlobalState);
    const [token] = state.token
    const [cart, setCart] = state.userAPI.cart

    const [shippingAddress, setShipping_address] = useState({
        phone: '',
        address: '',
        country: '',
        city: '',
        postalCode: ''
    });

    const addShippingAddress = async () => {
        await axios.patch('/user/addShippingAddress', { shippingAddress }, {
            headers: { Authorization: token }
        })
    }

    const onSubmit = (e) => {
        if (!shippingAddress.phone) {
            alert("You did not fill the number");
            return;
        }
        if (isNaN(shippingAddress.phone)) {
            alert("You did not fill integers");
            return;

        }
        e.preventDefault();
        addShippingAddress();
        alert("i am going");
        history.push('/place_order');
    }

    const onChangeInput = e => {
        const { name, value } = e.target;
        setShipping_address({ ...shippingAddress, [name]: value })
    }

    return <div className='container m-5'>
        <form className="row g-4 mx-5" onSubmit={onSubmit}>
            {/* <div className="col-md-6">
                <label for="inputName" className="form-label">Name</label>
                <input type="text" className="form-control" id="inputName" />
            </div>
            <div className="col-md-6">
                <label for="inputEmail4" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail4" />

            </div>
            */}
            <div className="col-6">
                <label for="inputPhone" className="form-label">Phone</label>
                <input type="text" className="form-control" id="iphone" name="phone" placeholder="017********" onChange={onChangeInput} />
            </div>
            <div className="col-6">
                <label for="inputAddress" className="form-label ">Address</label>
                <input type="text" className="form-control " id="inputAddress" name="address" placeholder="1234 Main St" onChange={onChangeInput} />
            </div>
            <div className="col-md-4">
                <label for="inputCity" className="form-label">Country</label>
                <input type="text" className="form-control" name='country' id="inputCity" onChange={onChangeInput} />
            </div>
            {/* <div className="col-md-4">
                <label for="inputState" className="form-label">City</label>
                <select id="inputState" className="form-select">
                    <option selected></option>
                    <option>.Dhaka..</option>
                    <option>.Sylhet..</option>
                </select>
            </div> */}
            <div className="col-md-4">
                <label for="inputCity" className="form-label">City</label>
                <input type="text" className="form-control" name="city" id="inputCity" onChange={onChangeInput} />
            </div>

            <div className="col-md-4">
                <label for="inputZip" className="form-label">Postal Code</label>
                <input type="text" className="form-control" name='postalCode' id="inputZip" onChange={onChangeInput} />
            </div>

            <div className="col-12">
                <button type="submit" className="btn btn-primary">Continue</button>
            </div>
        </form>
    </div>;
}

export default Shipping;
