import React from 'react'
import { useSelector } from "react-redux";

const OrderSummary = ({ sumShipping }) => {
   const cart = useSelector(state => state.cart)
   const orderDetails = useSelector(state => state.orderDetails)
   const { order, loading, error } = orderDetails

   let coupon, shippingPrice

   let cartItemsPrice = order ? Math.round(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
      : Math.round(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))


   // if (window.location.pathname === "/PaymentMethod") {
   //    coupon = cart.coupon ? cart.coupon : 0
   //    shippingPrice = cart.shippingPrice
   // } else {
   //    coupon = order.coupon
   //    shippingPrice = order.shippingPrice
   // }
   return (
      <>
         {/* <h1>סיכום הזמנה</h1> */}
         <table className="m-auto">
            <tbody>
               <tr>
                  <td>סיכום ביניים :</td>
                  <td>{cartItemsPrice} ש"ח</td>
               </tr>
               {/* <tr>
               <td>Coupon:</td>
               <td>-( {coupon}$ )</td>
            </tr> */}
               <tr>
                  <td> משלוח:</td>
                  <td>{sumShipping} ש"ח</td>
               </tr>
               <tr>
                  <td>סה"כ:</td>
                  <td>{cartItemsPrice + Number(sumShipping)} ש"ח
                  </td>
               </tr>
            </tbody>
         </table>
      </>
   )
}

export default OrderSummary
