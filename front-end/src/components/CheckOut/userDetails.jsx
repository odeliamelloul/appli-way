import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, login } from "../../actions/userActions"

const UserDetails = ({ isCorrectDetails, shippingBtnClicked }) => {

    const [errorName, setErrName] = useState("")
    const [errorMail, setErrMail] = useState("")
    const [errorPhone, setErrPhone] = useState("")

    let userName = useRef()
    let email = useRef()
    let phone = useRef()

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin


    useEffect(() => {

        if (!loading && userInfo && userInfo.length > 0) {
            dispatch(getUserDetails('profile'))
        }
        if (!loading && userInfo) {
            userName.current.value = userInfo.name;
            email.current.value = userInfo.email;
            phone.current.value = userInfo.phone;
        }
        // history.push('/Catalog')       
        shippingBtnClicked && sendForm()


    }, [shippingBtnClicked])

    //name
    const nameChange = () => {

        if (userName.current.value === "")

            setErrName("שדה חובה*")

        else {
            setErrName("")
            localStorage.setItem("name", userName.current.value)
        }

    }
    //email
    const emailChange = () => {

        if (!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email.current.value)) {
            if (email.current.value === "")
                setErrMail("שדה חובה*")
            else
                setErrMail("xxxx@gmail.com : הכנס מייל תקין ")
        }
        else {
            setErrMail("")
            localStorage.setItem("email", email.current.value)
        }
    }

    //phone
    const phoneChange = () => {
        if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone.current.value)) {
            if (phone.current.value === "")
                setErrPhone("שדה חובה*")
            else
                setErrPhone("הכנס מספר טלפון תקין")
        }
        else {
            setErrPhone("")
            localStorage.setItem("phone", phone.current.value)
        }
    }


    const sendForm = () => {
        nameChange(); emailChange(); phoneChange();
        if (errorName == "" && errorMail == "" && errorPhone == "") {
            isCorrectDetails(true)
        }
        else {
            isCorrectDetails(false)
        }
    }

    return (
        <div className='userDetails'>
            <div class="adressLI">
                <label> שם מלא <span className="errMsg">{errorName}</span></label>
                <input ref={userName} onBlur={nameChange} />
            </div>
            <div class="adressLI">
                <label>דואר אלקטרוני <span className="errMsg">{errorMail}</span></label>
                <input ref={email} onBlur={emailChange} />
            </div>
            <div class="adressLI">
                <label> טלפון <span className="errMsg">{errorPhone}</span></label>
                <input ref={phone} onBlur={phoneChange} />
            </div>

        </div>

    );
};


export default UserDetails;
