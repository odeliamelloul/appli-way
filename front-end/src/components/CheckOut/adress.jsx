import React, { useRef, useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../../actions/cartActions'
import israeCities from "../../actions/israelCity";
import "./checkOut.css";
import Autocomplete from 'react-autocomplete'
function Adress({ isCorrectDetails, shippingBtnClicked }) {

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const [country, setCountry] = useState("ישראל")
  const [errCity, setErrCity] = useState("")
  const [errStreet, setErrStreet] = useState("")
  const [errStreetNum, setErrStreetNum] = useState("")
  const [errPostCode, setErrPostCode] = useState("")
  const [saveAdress, setSaveAdress] = useState(false)
  const [city, setCity] = useState("")
  const [flag, setFlag] = useState(false)
  const dispatch = useDispatch()
  const street = useRef()
  const streetNum = useRef()
  const postCode = useRef()
  useEffect(() => {
    setCountry(shippingAddress.country)
    shippingBtnClicked && SaveChange()
  }, [shippingBtnClicked])
  //Country
  const CountryChange = (e) => {
    setCountry(e.target.value)
  }
  //city
  const cityChange = () => {

    if (city === "") {
      setErrCity("שדה חובה*")
    }
    else {
      setFlag(true)
      setErrCity("")
    }

  }

  //adress: street
  const addressChange = () => {
    if (!/^[\u0590-\u05FF]+[\s]*$/.test(street.current.value)) {
      setFlag(false)
      if (street.current.value === "")
        setErrStreet("שדה חובה*")
      else setErrStreet(" הרחוב שהכנסת אינו תקין *")
    }
    else {
      setErrStreet("")
    }
    if (!/^[0-9]{1,4}$/.test(streetNum.current.value)) {
      setFlag(false)
      if (streetNum.current.value === "")
        setErrStreetNum("שדה חובה*")
      else setErrStreetNum("בין 1-4 ספרות*")
    }
    else {
      setErrStreetNum("")
    }
    if (errStreet == "" && errStreetNum == "") {
      setFlag(true)
    }
  }

  //postCodeChange
  const postCodeChange = () => {
    if (!/^[0-9]{6,7}$/.test(postCode.current.value)) {
      setFlag(false)
      if (postCode.current.value === "")
        setErrPostCode("שדה חובה*")
      else setErrPostCode(" מינימום  6 מספרים")
    } else {
      setFlag(true)
      setErrPostCode("")
    }
  }
  const SaveChange = () => {
    cityChange()
    postCodeChange()
    addressChange()

    if (flag === true) {
      setSaveAdress(true)
      isCorrectDetails(true)
      dispatch(saveShippingAddress({ country: country, address: street.current.value + streetNum.current.value, city: city, postalCode: postCode.current.value }))
    }

  }
  return (

    <div className="d-flex flex-column wrap-adress">
      <div class="adressLI">
        <label> עיר <span className="errMsg">{errStreet}</span></label>
        <Autocomplete
          getItemValue={(item) => item.name}
          items={israeCities}
          shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
          renderItem={(item, isHighlighted) =>
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
              {item.name}
            </div>
          }
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onSelect={(val) => setCity(val)}
          inputProps={{ class: "adressInput" }}
        />
      </div>
      <div className="d-flex adressLI">
        <div class="street">
          <label> רחוב <span className="errMsg">{errStreet}</span> </label>
          <input type="text"
            class="adressInput"
            ref={street}
            onChange={addressChange}
          />
        </div>
        <div class="streetNum">
          <label> דירה <span className="errMsg">{errStreetNum}</span></label>
          <input type="text"
            class="adressInput"
            ref={streetNum}
            onChange={addressChange}
          />
        </div>
      </div>
      <div class="adressLI">
        <label>  מיקוד <span className="errMsg">{errPostCode}</span></label>
        <input
          class="cjRIpe"
          onChange={postCodeChange}
          ref={postCode}
        />
      </div>
      {/* <button onClick={SaveChange} className="shippingBtn"> שמור </button>
      {saveAdress && <p> הכתובת נשמרה בהצלחה</p>} */}
    </div>

  )
}

export default Adress
