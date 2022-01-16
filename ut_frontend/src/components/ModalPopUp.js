import React, {Component} from 'react'
import {Model, Button, Row, Col, Porm} from 'react-bootstrap'

function MaodalPopUp() {
    const [show, setShow] = useState(false);
    const [text, setText] = useState("No text");

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = (text) => {
        setText(text);
        setShow(true);
    }

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Launch demo modal
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Text: {text}</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default MaodalPopUp;



