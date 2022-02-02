import React, {useState, useEffect} from 'react'
import {Modal, Button, Alert} from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { clearNotifications, addNotification } from "../actions/utilActions";

const POPUP_TIME = 50000;

export default function ModalPopUp() {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    var lastOpenTime = performance.now();


    const handleClose = () => {
        if (performance.now() - lastOpenTime > POPUP_TIME * 0.9) {
            setShow(false);
            dispatch(clearNotifications());
        }
    };

    const handleShow = () => {
        setShow(true);
        lastOpenTime = performance.now();
        setTimeout(handleClose, POPUP_TIME);
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

    const nVariant = useSelector(
        (state) => state.notifications.variant
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
            <Alert variant={nVariant} show={show} className="alertShow">
                {notifications.map(message=> (
                    <div className="oneMessage" key={message}>
                        {message}
                    </div>
                ))}
            </Alert>
        </>
    );
}



