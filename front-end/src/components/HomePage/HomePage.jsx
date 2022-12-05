import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import './homePage.css'
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "../../actions/productActions"
import Loader from "../Loader"
import Carousel from '../Carousel'
import tools from '../../images/tools.jpg'
import garden from '../../images/garden.jpg'
import fans from '../../images/fans.jpg'
import batteries from '../../images/batteries.jpg'
import appliances from '../../images/appliances.jpg'
import lighting from '../../images/lighting.jpg'
import camera from '../../images/Camera.jpg'
import smartHome from '../../images/system.jpg'

function HomePage() {

  const dispatch = useDispatch()
  const productsList = useSelector(state => state.productList)
  const { loading, error, products } = productsList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin


  return (
    <>{loading ? <Loader /> :
      <div className="wrap-homePage">

        <div className="home-Recipe d-flex">
          <Link to={{ pathname: `/Search/system` }}><img src={smartHome} alt="" /><h6 className="nameRecipes"> מערכות בית חכם</h6></Link>
          <Link to={{ pathname: `/Search/camera` }}><img src={camera} alt="" /><h6 className="nameRecipes">מצלמות אבטחה</h6></Link>
          <Link to={{ pathname: `/Search/tools` }}><img src={require("../../images/tools.jpg").default} alt="" /><h6 className="nameRecipes">כלי עבודה</h6></Link>
          <Link to={{ pathname: `/Search/lighting` }}><img src={lighting} alt="" /><h6 className="nameRecipes">מנורות</h6></Link>
          <Link to={{ pathname: `/Search/ceilingFans` }}><img src={fans} alt="" /><h6 className="nameRecipes">מאווררים</h6></Link>
          <Link to={{ pathname: `/Search/garden` }}><img src={garden} alt="" /><h6 className="nameRecipes">גן וגינה</h6></Link>
          <Link to={{ pathname: `/Search/batteries` }}><img src={batteries} alt="" /><h6 className="nameRecipes">מצברים וסוללות</h6></Link>
          <Link to={{ pathname: `/Search/appliances` }}><img src={appliances} alt="" /><h6 className="nameRecipes">מוצרי חשמל</h6></Link>
          {/* <Link  to={{pathname:`/Search/new`}}><img src={} alt="" /><h6 className="nameRecipes">חדש</h6></Link>   */}
        </div>

      </div>}
    </>
  )

}
export default HomePage




