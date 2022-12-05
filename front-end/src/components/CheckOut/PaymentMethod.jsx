
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderStatus from "./HeaderStatus";
import CreditCartModal from '../paymentMethod/creditCardModal'
import BitCartModal from '../paymentMethod/bitModal'
const PaymentMethod = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [openModal, setopenModal] = useState(false);
  const cart = useSelector(state => state.cart)
  const estimatedDate = localStorage.getItem('estimateDate');
  const total = cart.cartItems.reduce((acc, item) => acc + (item.price + (item.installation ? item.installationPrice : 0)) * item.qty, 0)


  const methodChanged = (e) => {
    setPaymentMethod(e.currentTarget.value)
    if (e.currentTarget.value == "creditCard") {

    }
    else {

    }
  };

  const finishOrder = () => {
    setopenModal(true)
  }

  return (
    <div className="payment">
      <HeaderStatus />
      <div className="d-flex justify-content-around ">
        <div className="paymentSummary">
          <p className="shippingHeader" >סיכום חשבון </p>
          <label> המשלוח צפוי להגיע אליך עד  - {estimatedDate}</label>
          <hr />
          {/* cartItems */}
          {
            cart.cartItems.map((item) =>
              <div className="orderSummary">
                <img src={require('../../images/' + item.image[0]).default} width="50px" height="50px" />

                <label>{item.name} </label>
                <label> כמות:{item.qty}</label>
                <label> מחיר:{item.price}</label>
                <label htmlFor="">התקנה: {item.installation ? item.installationPrice : 0}</label>
              </div>
            )
          }
          <p>עלות משלוח : {cart.shippingPrice}</p>
          <p className="total-payment">סה"כ  :{total} ש"ח </p>
        </div>

        <div className="paymentMethod">
          <label className="blueText">איך ברצונך לשלם? </label>
          <div>
            <input type="radio" name="paymeny" value="creditCard" onClick={methodChanged} />
            <label htmlFor="creditCard"> כרטיס אשראי </label>
          </div>
          <div>
            <input type="radio" name="paymeny" value="bit" onClick={methodChanged} />
            <label htmlFor="creditCard"> תשלום באמצעות bit </label>
          </div>
          <div>
            <p className="toolTipText">עם השלמת ההזמנה, תיפתח חלונית תשלום מאובטחת להזנת פרטי האשראי</p>
          </div>
          <CreditCartModal method={paymentMethod} />
        </div>
      </div>
      <div>

      </div>
      {/* <div className="shipping">
        <PlaceOrder paymentMethod={paymentMethod} history={history} />
      </div> */}
    </div>
  );
};

export default PaymentMethod;
