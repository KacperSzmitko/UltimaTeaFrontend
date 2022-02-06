import React, {useState, useEffect, useRef } from 'react'
import {Modal, Button, Alert} from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { clearNotifications, addNotification } from "../actions/utilActions";

const POPUP_TIME = 5000;

export default function ModalPopUp() {
    const [show, setShow] = useState(false);
    const [lastOpenTime, setLastOpenTime] = useState(new Date().getTime());
    const dispatch = useDispatch();
    const lastOpenTimeRef = useRef(lastOpenTime);
    lastOpenTimeRef.current = lastOpenTime;


    const handleClose = (last) => {
        if (new Date().getTime() - last > POPUP_TIME * 0.9) {
            setShow(false);
            dispatch(clearNotifications());
        }
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
        if (notifications.length !== 0){
            setLastOpenTime(new Date().getTime());

            console.log("SET:"+lastOpenTime);//dev

            setTimeout(() => {handleClose(lastOpenTimeRef.current);}, POPUP_TIME);
        }
        

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
                    <div className="oneMessage">
                        {message}
                    </div>
                ))}
            </Alert>
        </>
    );
}



