import React, { useState, useEffect } from "react"
import "./Card.css"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from "../../../actions/productActions"
import { addToCart } from "../../../actions/cartActions"
import Carousel from "../../Carousel"
import { Modal, Table } from "react-bootstrap";
import { NavLink } from 'react-router-dom';

function Card({ product, history }) {
  const [isAdd, setAdded] = useState(false)
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()
  const productsList = useSelector(state => state.productList)
  const { loading, error, products } = productsList

  const cartDetails = useSelector((state) => state.cart)
  const { cartItems } = cartDetails


  const addProductToCart = (installation) => {
    let qty = 0
    setAdded(true)
    //check if item already exist in bag
    cartItems.forEach(element => {
      if (element.id === product._id)
        qty = element.qty
    });

    qty > 0 ? dispatch(addToCart(product._id, qty + 1)) : dispatch(addToCart(product._id, 1, installation))
    // setTimeout(()=>{ product.updateCart()},500)
    setTimeout(() => { setAdded(false) }, 250)
  }


  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => {
    if (product.installationPrice)
      setShow(true)
    else
      history.push(`/Catalog/${product._id}`)

  }
  return (
    <div>
      <div className="card">
        <Link className="card-product" style={{ textDecoration: "none" }} to={{ pathname: `/Catalog/${product._id}` }} >
          <Carousel id={`item${product._id}`}>
            <div className="container-fluid">{
              product.image.map((item, index) =>
                <div className={index === 0 ? "carousel-item active" : "carousel-item"} >
                  <div className="rowCarousel">
                    <div className="img-center-vertical">
                      <img className="card-img-top" src={require('../../../images/' + item).default} />
                    </div>
                  </div>
                </div>)}
            </div>
          </Carousel>
        </Link>
        <label className="mb-1 card-name">{product.name}</label>
        <label className="price"><i class="fa fa-ils" aria-hidden="true"></i> {product.price}</label>

        <div className="d-flex justify-content-between cardLabel">

          <button className="addToCartBtn" onClick={() => handleShow()}>הוסף לעגלה</button>

          <Modal show={show}>
            <Modal.Header closeButton onClick={() => handleClose()} >
            </Modal.Header>
            <Modal.Body className="show-grid">
              <label className="card-name">{product.name}</label>
              <div className="d-flex">
                <img width="75px" height="75px" src={require('../../../images/' + product.image[0]).default} />
                <Link to={{ pathname: `/Catalog/${product._id}` }} />
                <a href={`/Catalog/${product._id}`}>לפרטים</a>


              </div>
              <Table responsive>

                <tbody>
                  {product.installationPrice &&
                    <tr>
                      <th>מחיר המוצר</th>
                      <th>התקנה</th>
                    </tr>}
                  <tr>
                    <td>{product.price}ש"ח </td>
                    {
                      product.installationPrice &&
                      <td>{product.installationPrice}ש"ח</td>}
                  </tr>
                  <tr>
                    <td><button className="addToCartBtn" onClick={() => addProductToCart(false)}>  הוסף מוצר לעגלה</button></td>
                    {product.installationPrice && <td><button className="addToCartBtn" onClick={() => addProductToCart(true)}> הוסף מוצר + התקנה </button></td>}
                  </tr>

                </tbody>
              </Table>
            </Modal.Body>

            <Modal.Footer>

              <NavLink to="/Bag" className="icon-link-box-cart col">
                <button className="SmallCartBtn">
                  לצפייה ועריכת סל הקניות </button>
              </NavLink>
            </Modal.Footer>
          </Modal>



          {isAdd && <img className="animCard" src={require('../../../images/' + product.image[0]).default} alt="" />}

        </div>

      </div>
    </div>)
}
// const mapStateToproduct = (state) => {
//   return {
//     numOfItem: state.cartReducer.numOfItem
//   }}

//   const mapDispatchToproduct = (dispatch) => {
//   return {updateCart: () =>  dispatch(updateCart()) }
// } 

export default Card