import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../../Loader";
import { listProductDetails, updateProduct } from "../../../actions/productActions";
import '../admin.css'
import { PRODUCT_UPDATE_RESET } from "../../../constants/productConstant";
import { Link } from "react-router-dom";
import AddStepMethod from "../../Recipes/Create-update-recipe/AddStepMethod";
import UploadFiles from "../../upload-files";
function ProductEditScreen({ match, history }) {
  const productId = match.params.id
  const [image, setImage] = useState([])
  const [imageToUpload, setImageToUpload] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [weight, setWeight] = useState('')
  const [categories, setCategories] = useState([])
  const checkList = ['בוילר/תנור', 'מערכות', 'פתרונות למזגנים', 'מצלמות', 'אביזרים נלווים', 'מתגים', 'צגים']
  const [brand, setBrand] = useState("")
  const [color, setColor] = useState("")
  const [description, setDescription] = useState("")
  const [frequency, setFrequency] = useState("")
  const [inputVoltage, setInputVoltage] = useState("")
  const [materialType, setMaterialType] = useState("")
  const [type, setType] = useState("")
  const [oparatingSystem, setOparatingSystem] = useState("")
  const [installationPrice, setinstallationPrice] = useState("")
  const [countInStock, setCountInStock] = useState(0)
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push(`/admin/productList`)

    } else {

      if (!product.name || product._id !== productId)
        dispatch(listProductDetails(productId))

      else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setCountInStock(product.countInStock)
        setCategories(product.categories)
        setDescription(product.description)
        setBrand(product.brand)
        setColor(product.color)
        setFrequency(product.frequency)
        setInputVoltage(product.inputVoltage)
        setMaterialType(product.materialType)
        setType(product.type)
        setOparatingSystem(product.oparatingSystem)
        setinstallationPrice(product.installationPrice)
        setWeight(product.weight)
      }
    }


  }, [dispatch, history, productId, product, successUpdate])

  const sendForm = (e) => {
    e.preventDefault()
    dispatch(updateProduct(
      {
        _id: productId,
        image,
        name,
        price,
        weight,
        categories,
        description,
        brand,
        color,
        frequency,
        inputVoltage,
        materialType,
        type,
        oparatingSystem,
        installationPrice,
        countInStock
      }
    ))
  }

  const handleCheck = (event) => {
    var updatedList = [...categories];
    if (event.target.checked) {
      updatedList = [...categories, event.target.value];
    } else {
      updatedList.splice(categories.indexOf(event.target.value), 1);
    }
    setCategories(updatedList);
  };

  const addImages = (newImage) => {
    if (newImage) {
      sendImage(newImage.files[0])
    }
  }
  const deleteImg = (url) => {
    setImage(image.filter(img => img != url))
  }


  const sendImage = (imageFile) => {
    let formData = new FormData()
    formData.append("avatar", imageFile)
    fetch('http://localhost:5000/uploadFile', {
      method: "post",
      body: formData
    }).then(res => res.text()).then(resBody => {
      if (image == [])
        setImage([resBody])
      else
        setImage([...image, resBody])
    }
    )
  }

  return (
    <>
      <div>
        <h1>עדכן / הכנס מוצר</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <p>{errorUpdate}</p>}

        {loading ? <Loader /> : error ? <p>{error}</p>
          :
          (<form onSubmit={sendForm} className="d-flex flex-column formSign">

            <label>שם המוצר</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label>תמונה </label>
            {/* <input  type="text" value={image} onChange={(e)=>setImage(e.target.value)}  /> */}
            {image && image.length > 0 &&
              <div className="ol-steps">
                <div >
                  {image.map((img, index) => (
                    <>
                      <label>{img} </label>
                      <button onClick={() => deleteImg(img)}>מחק</button>
                      <br />
                    </>
                  ))}
                </div>
              </div>}
            {/* <UploadFiles /> */}
            <AddStepMethod addImages={addImages} />

            <label>תיאור המוצר</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            <label htmlFor="">מפרט</label>

            <label htmlFor="" >מותג</label>
            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
            <label htmlFor="" >צבע</label>
            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
            <label htmlFor="" >תדר</label>
            <input type="text" value={frequency} onChange={(e) => setFrequency(e.target.value)} />
            <label htmlFor="" >מתח כניסה</label>
            <input type="text" value={inputVoltage} onChange={(e) => setInputVoltage(e.target.value)} />
            <label htmlFor="" >סוג חומר</label>
            <input type="text" value={materialType} onChange={(e) => setMaterialType(e.target.value)} />
            <label htmlFor="" >מערכת הפעלה</label>
            <input type="text" value={oparatingSystem} onChange={(e) => setOparatingSystem(e.target.value)} />
            <label htmlFor="" >סוג</label>
            <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
            <label >מחיר</label>
            <div className="d-flex priceDolar ">
              <input className="input-price" type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
              <label >ש"ח</label>
            </div>
            <label >מחיר להתקנה</label>
            <div className="d-flex priceDolar ">
              <input className="input-price" type="text" value={installationPrice} onChange={(e) => setinstallationPrice(e.target.value)} />
              <label >ש"ח</label>
            </div>
            <label>בחר קטגוריה:</label>
            <div className="checkList">
              <div className="list-container">
                {checkList.map((item, index) => (

                  <div key={index}>
                    <input value={item} checked={categories.includes(item) ? true : false} type="checkbox" onChange={handleCheck} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <label>כמות במלאי</label>
            <input type="text" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
            <button type="submit" className="signBtn">עדכן</button>
            {successUpdate &&
              <>
                <h4>התעדכן בהצלחה במערכת</h4>
                <Link to={{ pathname: '/admin/productList' }}>לרשימת המוצרים</Link>
              </>
            }

          </form>)
        }


      </div>
    </>
  )
}
export default ProductEditScreen