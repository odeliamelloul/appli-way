
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux'

function BagItem({ product }) {
  const [amount, setAmount] = useState(product.qty)
  const [favoriteSrc, setfavoriteSrc] = useState("https://img.icons8.com/windows/32/000000/like--v1.png")
  const [checked, setChecked] = useState(product.installation);


  useEffect(() => {
    console.log(product)
  }, [])

  const dispatch = useDispatch()
  const cartDetails = useSelector((state) => state.cart)
  const { cartItems } = cartDetails

  const addProduct = () => {
    setAmount(amount + 1)
    dispatch(addToCart(product.id, amount + 1))
  }
  const handleChange = () => {
    setChecked(!checked);
    dispatch(addToCart(product.id, amount, checked))
  };

  //remove one from this
  const removeProdct = () => {
    if (amount > 1) {
      setAmount(amount - 1)
      dispatch(addToCart(product.id, amount - 1))
    }
    else {
      dispatch(removeFromCart(product.id))
    }

  }


  const changeSrc = () => {
    if (favoriteSrc !== "https://img.icons8.com/fluency/32/000000/like.png")
      setfavoriteSrc("https://img.icons8.com/fluency/32/000000/like.png")
    else
      setfavoriteSrc("https://img.icons8.com/windows/32/000000/like--v1.png")

  }

  return (

    <div className="d-flex cartItems">
      <Link className='productImgAndName' to={{ pathname: `/Catalog/${product.id}` }}>
        <b>{product.name}</b>
        <div>
          <img src={require('../../images/' + product.image[0]).default} />
        </div>
      </Link>
      <div className="d-flex flex-column DetailsItem">
        <p className="cart-price">מחיר: {product.price}ש"ח</p>
        <p className="cart-price">
          <input className='insallationCheckbox'
            type="checkbox"
            checked={product.installation}
            onChange={handleChange}
          /> התקנה: {product.installationPrice ? product.installationPrice : 0}ש"ח</p>


        <p className="d-flex plusMinus">
          <button className="minus" onClick={removeProdct}>-</button>
          <div className="amount">{amount}</div>
          <button className="plus" onClick={addProduct}>+</button>
        </p>
        <p>{((product.price + (product.installation && product.installationPrice)) * amount).toFixed(2)}ש"ח</p>
        {/* <button className="remove-product-btn" onClick={()=>{dispatch(removeFromCart(product.id))}}><img src="https://img.icons8.com/external-icongeek26-outline-gradient-icongeek26/32/000000/external-bin-city-life-icongeek26-outline-gradient-icongeek26.png"/></button> */}
        <div >
          {/* <button onClick={changeSrc}>
                    <img  src={favoriteSrc}/> 
                </button>     */}
        </div>
      </div>


    </div>
  )
}



export default BagItem

