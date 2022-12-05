import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./Details.css";
import StarAnimation from "../../StarAnimation";
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../../actions/cartActions';
import { listProductDetails } from '../../../actions/productActions'

function ProductDetails(props) {
  const [amount, setAmount] = useState(0);
  const [shareCopied, setShareCopied] = useState(false);
  const [copiedSrc, setCopiedSrc] = useState("https://img.icons8.com/265d75/ios-glyphs/30/share--v1.png");
  const [isAdd, setIsAdd] = useState(false);
  const [footer, setFooter] = useState("");
  const dispatch = useDispatch()
  const productsDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productsDetails
  const [imgSelected, setImgSelected] = useState('');
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(listProductDetails(props.match.params.id))

    cart.cartItems.forEach((item) => {
      if (item.id === props.match.params.id)
        setAmount(item.qty)
    });


  }, [dispatch, props.match])

  const removeProduct = () => {
    let num = amount;
    if (num > 0) {
      num -= 1;
      setAmount(num);
      cart.cartItems.forEach((item) => {
        if (item.id === props.match.params.id)
          item.qty = num;
        dispatch(addToCart(product._id, num))
      });
    }
  };

  const addProduct = () => { setAmount(amount + 1); };

  const addProductToCart = () => {
    setIsAdd(true);
    dispatch(addToCart(product._id, amount))
    setTimeout(() => {
      setIsAdd(false);
    }, 2000);
  };

  const itsCopied = () => {
    setShareCopied(true);
    setCopiedSrc("https://img.icons8.com/fluency/48/000000/good-pincode.png");
    setTimeout(
      () => {
        setShareCopied(false);
        setCopiedSrc(
          "https://img.icons8.com/265d75/ios-glyphs/30/share--v1.png"
        );
      },

      1500
    );
  };
  const url = window.location.href;

  const specificationDiv = <tbody className="specification">
    <tr >
      <th className="col label">מותג:</th>
      <td className="col data">{product.brand}</td>
    </tr>
    <tr>
      <th className="col label">צבע:</th>
      <td className="col data">{product.color}</td>
    </tr>
    <tr>
      <th className="col label">תדר:</th>
      <td className="col data">{product.frequency}</td>
    </tr>
    <tr>
      <th className="col label">מתח כניסה:</th>
      <td className="col data">{product.inputVoltage}</td>
    </tr>
    <tr>
      <th className="col label">סוג חומר:</th>
      <td className="col data">{product.materialType}</td>
    </tr>
    <tr>
      <th className="col label">סוג:</th>
      <td className="col data">{product.type}</td>
    </tr>
    <tr>
      <th className="col label">מערכת הפעלה:</th>
      <td className="col data">{product.oparatingSystem}</td>
    </tr>
  </tbody>;

  const descriptionDiv = <tbody ><td className="description">{product.description}</td></tbody>

  return (
    <div>
      <div className="detailsCard">
        <div class="left-mini-images d-flex flex-column">
          {product.image?.map((img) =>
            <img src={require('../../../images/' + img).default} width="100px" height="100px" onClick={() => { setImgSelected(img) }} />
          )}
        </div>

        <div >
          {imgSelected ?
            <img className="productImage" src={require('../../../images/' + imgSelected).default} alt="" />
            :
            product.image &&
            <img className="productImage" src={require('../../../images/' + product.image[0]).default} alt="" />
          }
        </div>

        <div className="details">
          <div>
            <div className="d-flex">
              <p className="nameOfProduct">{product.name}</p>
              <button className="shareUrl" onClick={itsCopied}>
                <CopyToClipboard text={url}>
                  <img src={copiedSrc} />
                </CopyToClipboard>
              </button>
              {/* {shareCopied && <span className="copied">Copied!</span>} */}
            </div>

            <div className="addToBag">
              <p class="price">{product.price} <i class="fa fa-ils" aria-hidden="true"></i></p>
              {/* <p >{product.countInStock > 0 ? 'במלאי' : 'חסר'}</p> */}
              <div className="addToCart">
                <div className="addOrRemove">
                  <i className="fa fa-minus" onClick={() => removeProduct()}></i>
                  <span className="amountPlusMinus">{amount}</span>
                  <i className="fa fa-plus" onClick={() => addProduct()} ></i>
                </div >
                <button className="btnAdd" onClick={() => addProductToCart()}>
                  הוספה לסל  <i className="fa fa-shopping-cart"></i>
                </button>
              </div>
              {isAdd && (
                <img className="animImg" src={require('../../../images/' + product.image[0]).default} alt="" />
              )}
              {/* <StarAnimation /> */}
              <nav>
                <button className="btn-footer-details mt-5" onClick={() => setFooter(descriptionDiv)}>תיאור</button>
                <button className="btn-footer-details mt-5" onClick={() => setFooter(specificationDiv)}>מפרט</button>
              </nav>
              <table className="spesOrDesc">
                {footer ? footer : descriptionDiv}
              </table>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};


export default ProductDetails;
