import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Table, ModalBody } from "react-bootstrap";
import ModalHeader from 'react-bootstrap/esm/ModalHeader';


const PaymentModel = (props) => {
    let israelId = useRef();
    const [show, setShow] = useState(props.open);
    function is_israeli_id_number(e) {
        let id = String(e.target.value).trim();
        if (id.length > 9 || isNaN(id)) return false;
        id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
        return Array.from(id, Number).reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1);
            return counter + (step > 9 ? step - 9 : step);
        }) % 10 === 0;
    }



    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    return (
        <div>
            <button onClick={() => handleShow()} className="shippingBtn">לתשלום</button>
            <Modal className="paymentModal" show={show}>
                <ModalHeader closeButton onClick={() => handleClose()} >תשלום באמצעות כרטיס אשראי </ModalHeader>
                <ModalBody >
                    <div class="sc-bczRLJ iomWYs">
                        <label> מספר כרטיס<span className="errMsg"></span></label>
                        <input class="sc-gsnTZi cjRIpe" min={16} max={16} />
                    </div>
                    <div class="sc-bczRLJ iomWYs">
                        <label> תוקף כרטיס<span className="errMsg"></span></label>
                        <select class="form-control form-control-2 notranslate" data-placeholder="חודש" id="date_month_input" name="MonthsList1" title="חודש"><option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>04</option>
                            <option>05</option>
                            <option>06</option>
                            <option>07</option>
                            <option>08</option>
                            <option>09</option>
                            <option selected="selected">10</option>
                            <option>11</option>
                            <option>12</option>
                        </select> /
                        <select class="form-control form-control-1 notranslate" data-placeholder="שנה" id="date_year_input" name="YearsList" title="שנה"><option>2021</option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                            <option>2025</option>
                            <option>2026</option>
                            <option>2027</option>
                            <option>2028</option>
                            <option>2029</option>
                            <option>2030</option>
                            <option>2031</option>
                            <option>2032</option>
                        </select>
                    </div>
                    <div class="sc-bczRLJ iomWYs">
                        <label>  תעודת זהות<span className="errMsg"></span></label>
                        <input ref={israelId} class="sc-gsnTZi card" onChange={is_israeli_id_number} />
                    </div>
                </ModalBody>
            </Modal>
        </div>

    );
};


PaymentModel.propTypes = {

};


export default PaymentModel;
