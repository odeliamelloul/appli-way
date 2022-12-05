import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Moment from 'moment';


function ShippingMethod({ getSumShipping, sum }) {

  const [checkMethod, setCheckMethod] = useState(false)
  const [SumShipping, setSumShipping] = useState(0)
  const cart = useSelector(state => state.cart)
  const order = useSelector(state => state.order)



  useEffect(() => {

    if (checkMethod === false)
      getSumShipping(-1)
    else
      getSumShipping(SumShipping)
  }, [checkMethod, SumShipping])

  const methodChanged = (e) => {
    setCheckMethod(true)
    if (e.currentTarget.value === "standard") {
      if (sum < 500) setSumShipping(25);
      else setSumShipping(0);
      localStorage.setItem("estimateDate", addDays(date, 5))
    }
    else {
      if (sum < 1000) setSumShipping(35);
      else setSumShipping(0);
      localStorage.setItem("estimateDate", addDays(date, 2))
    }
  };

  const addDays = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return Moment(result).format('DD-MM-YYYY');
  }
  const date = new Date()

  return (
    <>

      <p className='shippingHeader'>בחירת משלוח </p>
      <table className="d-flex flex-column mt-4  ">
        <tbody>
          <thead>
            <th>סוגי משלוח</th>
            <th>תאריך משוער:</th>
            <th>משלוח חינם</th>
          </thead>
          <tr>
            <td>

              <input
                type="radio"
                onClick={methodChanged}
                value="standard"
                name="delivery"
                id="" />
              <p>משלוח סטנדרטי</p>
            </td>

            <td>
              <div className="date"> {addDays(date, 5)}</div>
              <div className="price"> 25 ש"ח</div>
            </td>
            <td>
              <div className="free"> מעל 500 ש"ח</div>
            </td>
          </tr>

          <tr>
            <td >
              <input
                type="radio"
                onClick={methodChanged}
                value="Express"
                name="delivery"
                id="" /><p>משלוח מהיר</p>
            </td>
            <td>
              <div className="date"> {addDays(date, 2)}</div>
              <div className="price"> 35 ש"ח </div></td>
            <td>
              <div className="free"> מעל 1000 ש"ח</div>
            </td>
          </tr>
        </tbody>
      </table>

    </>
  )
}

export default ShippingMethod
