import React, {useState, useEffect} from 'react'
import {Modal, Button} from 'react-bootstrap'
import { useSelector } from "react-redux";

export default function ModalPopUp() {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    const notifications = useSelector(
        (state) => state.notifications.notifications
    );

    useEffect(() => {
        if (!show && notifications.length !== 0){
            handleShow();
        }

        if (show && notifications.length === 0)
        {
            handleClose();
        }

    }, [notifications]);



    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Show notifications
        </Button>

        <Modal show={show} onHide={handleClose} className="modalShow" backdropClassName="modalShow">
            <Modal.Header closeButton>
            <Modal.Title>Powiadomienie</Modal.Title>
            </Modal.Header>
            <Modal.Body><br /> {notifications}</Modal.Body>
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



