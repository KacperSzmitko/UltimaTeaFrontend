import { NOTIFY, NOTIFY_CLEAR } from "./types";
import axios from "axios";

const clearNotifications = () => (dispach) => {
    dispach({ type: NOTIFY_CLEAR });
};

const addNotification = (data) => (dispach) => {
    dispach({ type: NOTIFY, data });
};


export {
    clearNotifications,
    addNotification,
};