import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';
import OrderSummary from './OrderSummary';
import CreditCardModal from '../paymentMethod/creditCardModal';

function ShippingSummary({ sum, history, isBtnClicked }) {
  const couponText = useRef();
  const [srcLock, setSrcLock] = useState("https://img.icons8.com/ultraviolet/40/000000/lock--v2.png")
  const [coupon, setCoupon] = useState({ value: 0, name: "" })
  const [errorMsg, setErrorMsg] = useState("")
  const cart = useSelector(state => state.cart)



  useEffect(() => {
    if (cart.shippingPrice !== -1)
      setErrorMsg("")

  }, [cart.shippingPrice])


  const goToPayment = () => {
    let correctAdress = checkAdress();
    console.log(cart.shippingAddress);
    console.log(cart.shippingPrice);
    if (correctAdress &&
      cart.shippingPrice !== -1) {
      setErrorMsg("")
      history.push("/PaymentMethod")
    }

    else {
      if (cart.shippingPrice === -1)
        setErrorMsg("בחר שיטת משלוח")
      else setErrorMsg("הפרטים שהכנסת אינם תקינים")
    }
  }



  const checkAdress = () => {
    if (cart.shippingAddress.address != undefined &&
      cart.shippingAddress.city != undefined &&
      cart.shippingAddress.postalCode != undefined)
      return true;
    else
      return false;
  }

  let SumShipping = cart.shippingPrice === -1 ? 0 : cart.shippingPrice
  const emptyCoupon = { value: 0, name: "" }
  let { value, name } = coupon !== undefined ? coupon : emptyCoupon
  let couponValue = Math.round(sum * value)
  cart.coupon = couponValue
  return (
    <div className="d-flex flex-column order-summary">
      <p className='shippingHeader'>סיכום הזמנה</p>
      <OrderSummary sumShipping={SumShipping} />
      <button onClick={goToPayment} className="payCartBtn">לתשלום</button>
      <p className='errMsg'>{errorMsg}</p>
    </div>
  )
}

export default ShippingSummary
