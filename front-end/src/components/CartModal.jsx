import React from 'react'
import { Modal, Button, Table } from "react-bootstrap";
import { NavLink } from 'react-router-dom';

function CartModal(props) {
   const bag=localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]
    let sum
    bag===[]?sum=0: sum=bag.map((item)=>item.price*item.qty).reduce((prev,next)=>prev+next,0)

    return (
    <div>
      { props.open===true
      &&
      <div>
        <Modal.Body className="show-grid">
        <Table responsive>
        <thead>
            <tr className="small-cart-heading-row">
              <td>מוצר</td>
              <td> מחיר ליחידה </td>
              <td>כמות</td>
            </tr>
          </thead>
          <tbody>
              {bag.map((item, index) => (
                  <tr key= {index}>
                      <td>
                      <NavLink to={{pathname:`/Catalog/${item.name.split(" ").join("-")}`}} className="icon-link-box-cart col">
                              <img width="50px" height="50px" className="small-cart-book-img" src={require('./../images/'+item.image[0]).default} alt=""/>                  
                      </NavLink>
                      </td>
                      <td><i class="fa fa-ils" aria-hidden="true"></i> {item.price}</td>
                      <td>{item.qty}</td>                     

                  </tr>
                  
              ))}
                  <tr className="cart-sums-row">
                          <th>סה"כ</th>
                          <th></th>
                          <th><i class="fa fa-ils" aria-hidden="true"></i> {sum}</th>
                  </tr>
            </tbody>
          </Table>
          </Modal.Body>
          <Modal.Footer>

            <NavLink to="/Bag" className="icon-link-box-cart col">
                <button className="SmallCartBtn">
                    לסל קניות </button>
            </NavLink>
            <NavLink to="/Catalog" className="icon-link-box-cart col">
                <button className="SmallCartBtn">
                    להמשך קניה</button>
            </NavLink>
        </Modal.Footer>
        </div>
        } 
      </div>
    
    );
  }

  
  export default CartModal;