import React, {useState, useEffect} from 'react'
import {Modal, Button} from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { clearNotifications, addNotification } from "../actions/utilActions";


export default function ModalPopUp() {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();


    const handleClose = () => {
        setShow(false);
        dispatch(clearNotifications());
    };

    const handleShow = () => {
        setShow(true);
    };

    const notifications = useSelector(
        (state) => state.notifications.notifications
    );

    const authNotification = useSelector(
        (state) => state.auth.notification
    );

    const mainNotification = useSelector(
        (state) => state.main.notification
    );
    
    useEffect(() => {
        if(authNotification instanceof String || typeof authNotification === 'string')
        dispatch(addNotification(authNotification))
    }, [authNotification]);

    useEffect(() => {
        if(authNotification instanceof String || typeof mainNotification === 'string')
        dispatch(addNotification(mainNotification))
    }, [mainNotification]);


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
                Zamknij
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}



