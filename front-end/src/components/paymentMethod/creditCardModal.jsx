import React, { useState, useRef, useEffect } from 'react'

import { Modal, Button, Table, ModalBody } from "react-bootstrap";
import ModalHeader from 'react-bootstrap/esm/ModalHeader';


const CreditCardModal = ({ method }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    function is_israeli_id_number(e) {
        let id = String(e.target.value).trim();
        if (id.length > 9 || isNaN(id)) return false;
        id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
        return Array.from(id, Number).reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1);
            return counter + (step > 9 ? step - 9 : step);
        }) % 10 === 0;
    }



    return (
        <>
            <button onClick={() => handleShow()}>השלמת הזמנה </button>

            <Modal show={show}>
                <ModalHeader closeButton onClick={() => handleClose()} >תשלום באמצעות כרטיס אשראי </ModalHeader>
                <ModalBody >
                    <div class="cWLI">
                        <input type="checkbox" name="readPolicy" id="" />
                        <a> קראתי תקנון </a>
                    </div>
                    <div class="cWLI">
                        <label> מספר כרטיס<span className="errMsg"></span></label>
                        <input class="creditCard" min={16} max={16} />
                    </div>
                    <div class="cWLI d-flex">
                        <label> תוקף כרטיס<span className="errMsg"></span></label>
                        <select class="creditCard-date" data-placeholder="שנה" id="date_year_input" name="YearsList" title="שנה"><option>2021</option>
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
                        </select>/
                        <select class="creditCard-date" data-placeholder="חודש" id="date_month_input" name="MonthsList1" title="חודש"><option>01</option>
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
                        </select>
                    </div>
                    <div class=" cWLI">
                        <label> תעודת זהות<span className="errMsg"></span></label>
                        <input class="creditCard" onChange={is_israeli_id_number} />
                    </div>
                    <div class=" cWLI">
                        <label> cvv <span className="errMsg"></span></label>
                        <input class="creditCard" type='number' length="3" />
                    </div>
                    <button type="button" id="submitBtn" class="btn btn-primary" title="אחרי לחיצה תועבר חזרה לאתר בית העסק">בצע תשלום </button>

                </ModalBody>
            </Modal>
        </>
    );
};



export default CreditCardModal;
