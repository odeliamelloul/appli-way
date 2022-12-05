
import React, { useState, useEffect } from 'react'
import BagItem from '../Bag/BagItem'
import BeforePayement from '../CheckOut/BeforePayement'
import "./Bag.css"
import { Link } from "react-router-dom"
import HeaderStatus from '../CheckOut/HeaderStatus';
import { useDispatch, useSelector } from 'react-redux'
function Bag(props) {

  const [openModal, setOpenModal] = useState(true)

  const cartDetails = useSelector((state) => state.cart)
  const { cartItems } = cartDetails

  const userLogion = useSelector(state => state.userLogin)
  const { userInfo } = userLogion

  const [coupon, setCoupon] = useState("")
  const getCoupon = (coupon) => { setCoupon(coupon) }

  useEffect(() => {
    console.log(cartItems);
    if (userInfo.name) {
      setOpenModal(false)
    }
    else setOpenModal(true)
  }, [openModal])


  let sum = Math.round(cartItems.map((item) => item.price * item.qty).reduce((prev, next) => prev + next, 0))
  return (

    <div className="Cart">

      {cartItems.length === 0 ?
        <div className="p-5">
          {/* <img src="https://img.icons8.com/external-bearicons-gradient-bearicons/64/000000/external-empty-cart-essential-collection-bearicons-gradient-bearicons.png"/> */}
          <h4>סל הקניות שלך ריק</h4>
          <Link className="home-btn-shop bg-light p-0" to="/Catalog">לקטלוג</Link>
        </div> :
        <div className=" d-flex flex-column wrapCart">
          <HeaderStatus />
          <div className="d-flex flex-column wrapDetails" >
            {cartItems.map((item) => <BagItem product={item} />)}
          </div>
          <div className="summary d-flex flex-column" >
            <h4> סה"כ : {sum}</h4>
            {openModal && <BeforePayement openModal={openModal} />}
            {openModal === false && <Link to={{ pathname: "/Shipping", state: { sum } }} className="payCartBtn">לתשלום מאובטח </Link>}
          </div>
        </div>}
    </div>
  )


}



export default Bag
