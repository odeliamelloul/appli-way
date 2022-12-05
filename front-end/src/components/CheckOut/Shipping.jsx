import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ShippingSummary from './ShippingSummary'
import Adress from './adress'
import HeaderStatus from './HeaderStatus'
import ShippingMethod from './ShippingMethod'
import { useSelector } from "react-redux";
import UserDetails from './userDetails'


function Shipping(props) {
    const cart = useSelector(state => state.cart)

    const [shipping, setShipping] = useState()
    const [shippingBtnClicked, setShippingBtnClicked] = useState();
    const getSumShipping = (SumShipping) => {
        setShipping(SumShipping)
        cart.shippingPrice = SumShipping
    }

    const isBtnClicked = (isClicked) => {
        setShippingBtnClicked(isClicked)
    }
    return (
        <div>
            <HeaderStatus />
            <div className="wrap-shipping ">
                <p className='shippingHeader' > פרטים אישיים</p>
                <div className='d-flex'>
                    <div className="shipping">
                        <UserDetails shippingBtnClicked={shippingBtnClicked} />
                    </div>
                    <div className="shipping">
                        <Adress shippingBtnClicked={shippingBtnClicked} />
                    </div>
                </div>

                <div className="shipping">
                    <ShippingMethod getSumShipping={getSumShipping} sum={props.location.state.sum} />
                </div>
                <div className="shipping">
                    <ShippingSummary isBtnClicked={isBtnClicked} shipping={shipping} sum={props.location.state.sum} history={props.history} />
                </div>
            </div>

        </div>
    )
}

export default Shipping
