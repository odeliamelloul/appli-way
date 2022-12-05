import React ,{useState,useContext,useEffect} from "react"
import {NavLink, Link} from "react-router-dom"
import CartModal from "./CartModal"
import logo from "./../logo.jpg"
import { logout, updateUserProfile } from '../actions/userActions';
import {useDispatch,useSelector} from 'react-redux';
import SearchBox from "./SearchBox";
import { Route } from "react-router";
import  categories from "../categories";


function Header(props)
{

   const [showSmallCart, setShowSmallCart] = useState(false)
   const [classLogIn, setClassLogIn] = useState("d-none")
   const [collapse, setCollapse] = useState("")
   const [classModal, setClassModal] = useState("d-none")
   
   const dispatch = useDispatch()
   const cartDetails = useSelector((state) => state.cart)
   const { cartItems } = cartDetails

   const userLogin=useSelector(state=>state.userLogin)
   const {userInfo}=userLogin


   useEffect(() => {
          if(userInfo){
          console.log(userInfo)  
          }
    }, [userInfo])

    const handleShowModalSmallCart = () => {
      setShowSmallCart(true)
       classLogIn==="d-none" && setClassModal("d-block")
    }

    const handleCloseModalSmallCart = () => {
      setShowSmallCart(false)
      setClassModal("d-none")
    }
    
    const logOut=()=>
    {
      let cartItems=localStorage.getItem("cartItems")?
        JSON.parse(localStorage.getItem("cartItems")):[]

      dispatch(updateUserProfile({id:userInfo._id,cart:cartItems}))
      dispatch(logout())
    }
    const collapseNavbar=()=>
    {

    }
        return(

          <div>
            <div className="d-flex first-header">
              <div>
                <h1> הבית החכם שלך</h1>
                <Route  render={({history})=><SearchBox width="300px" history={history}/>}/>
               </div>
               <img width="200px" height="150px" src={logo} alt="" />  
            </div>
               
               <nav className="navbar navbar-expand-lg">
          <div className="categories-header m-0">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
               

              <div  className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav  navbar-collapse justify-content-center  me-auto mb-2 mb-lg-0">
                  
                  {
                    Object.keys(categories).map((key)=>
                   ( <li className="nav-item">
                    <Link className="nav-link active" aria-current="page"to={{pathname:`/Search/${key}`}}>{categories[key]}</Link>
                   </li>)
                    )
                  }                 
                
                
                   <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={{pathname:"/ContactUs"}}>צור קשר </Link>
                   </li>

                </ul>
                {userInfo && userInfo.isAdmin &&
                (<div className="dropdown ml-4">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    תפריט מנהל
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><Link className="dropdown-item" to={{pathname:"/admin/userList"}}>לקוחות</Link></li>
                      <li><Link className="dropdown-item" to={{pathname:"/admin/productList"}}>מוצרים</Link></li>
                      <li><Link className="dropdown-item" to={{pathname:"/admin/orderList"}}>הזמנות</Link></li>
                    </ul>
                  </div>)}</div> 
               <div className="dropdown" >
               <a className="nav-link dropdown-toggle p-0 m-0" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:'transparent', border:"none"}}>

                  <img src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/32/265d75/external-user-user-flatart-icons-outline-flatarticons-15.png"/></a>
                  {
                  userInfo && userInfo.length!==0 ?
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1"  >
                      <li className="dropdown-item" ><div dir="rtl">{userInfo.name}</div></li>
                      <li><Link  dir="rtl" className="dropdown-item" to={{pathname:"/UserProfile"}}>פרופיל</Link></li>
                      <li ><button dir="rtl" className="dropdown-item" onClick={logOut}>התנתק</button></li>
                 </ul> 
                 :
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><Link onClick={collapseNavbar} className="dropdown-item" to={{pathname:"/SignIn"}} >התחבר</Link></li>
                      <li><Link className="dropdown-item"  to={{pathname:"/SignUp"}} >הרשם</Link></li>
                  </ul> 
                }
              </div>    
                 <Link to={{pathname:"/Bag"}} className="container-bag">
                          <button className= "openCartBtn" onClick={handleCloseModalSmallCart} onMouseOver={handleShowModalSmallCart}>
                            <img src="https://img.icons8.com/265d75/ios-filled/32/shopping-bag.png"/>
                            <p className="centered-cart-qty">{cartItems.map((item)=>item.qty).reduce((prev,next)=>prev+next,0)}</p>
                          </button>
                  </Link>      
            </div>
          </nav>
         

               
          {
           (window.location.pathname!=="/Bag" &&  cartItems.length>0)&&
            <div className={`cartModal ${classModal}`} onClick={handleCloseModalSmallCart} onMouseLeave={handleCloseModalSmallCart}>
              <CartModal  open={showSmallCart}/> 
           </div>
          }

        </div>

        )
    }


export default Header