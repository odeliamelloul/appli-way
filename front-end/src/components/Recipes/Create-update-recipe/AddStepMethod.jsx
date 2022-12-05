import React,{useState,useEffect} from 'react'
import { Modal, Button, Table } from "react-bootstrap";

const AddStepMethod = ({addImages}) => {
    const [image, setImage] = useState("")
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = (e) =>{ 
        e.preventDefault()
        setShow(true)};

const addNewStep=()=>
{
    addImages(image)
    handleClose()
    setImage("")
}
    return (
        <>
        <button className="signBtn" onClick={(e)=>handleShow(e)}>הוסף תמונה</button>
        <Modal show={show} className="modal-add-step">
            <Modal.Header closeButton onClick={()=>handleClose()} >
              <Modal.Title>
                הוסף תמונה
              </Modal.Title>
            </Modal.Header>
                <label htmlFor="">url</label>
                <input type="file"  onChange={(e)=>setImage(e.target)}></input>
                {/* <textarea value={image} onChange={(e)=>setImage(e.target.value)} /> */}

         <button onClick={addNewStep}>הוסף</button>
        </Modal>
        </>
    )
}

export default AddStepMethod
