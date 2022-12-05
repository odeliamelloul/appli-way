import React, { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, login } from "../../actions/userActions"
import { Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { addToCart } from "../../actions/cartActions"
import Loader from "../Loader"

function SignIn(props) {
  const email = useRef();
  const Password = useRef();
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  let lastPathName = props.location.state && props.location.state.name ? props.location.state.name : ""


  useEffect(() => {

    if (!loading && userInfo && userInfo.length > 0) {
      dispatch(getUserDetails('profile'))

    }


    if (!loading && userInfo && userInfo.cart) {
      userInfo.cart.forEach((product) => {
        dispatch(addToCart(product.id, product.qty))
      })
      localStorage.setItem("cartItems", JSON.stringify(userInfo.cart))
      if (lastPathName === "RecipeBook") {
        props.history.push("/RecipeBook")
      } else {
        window.history.back();
      }
      // history.push('/Catalog')
    }

  }, [loading, userInfo, dispatch])

  const submitForm = (e) => {
    e.preventDefault()

    dispatch(login(email.current.value, Password.current.value))
  }


  return (<>
    <div>
      <h1>התחבר</h1>
      <form className=" d-flex flex-column formSign">

        <label htmlFor="">אימייל</label>
        <input type="email" ref={email} placeholder="xxx@gmail.com" required />
        <label htmlFor="">סיסמא</label>
        <input type="password" ref={Password} placeholder="********" required />
        <button type="submit" className="signBtn" onClick={(e) => submitForm(e)}>התחבר</button>
        {loading && <Loader />}
        {error && <spaan className="ErrForm">המייל או הסיסמא אינם תקינים</spaan>}
        {!loading && userInfo && userInfo.cart && <img src="https://img.icons8.com/fluency/96/checked.png 2x" />}

      </form>
      <Row className='py-3'>
        <Col>
          לקוח חדש?{' '}
          <Link className="Link-SignUp" to={{ pathname: '/SignUp', state: { backLocation: window.location.pathname } }}>
            הרשם
          </Link>
        </Col>
      </Row></div>

  </>
  )
}
export default SignIn