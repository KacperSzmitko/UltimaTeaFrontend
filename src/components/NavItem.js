import React from 'react'
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavItem(props) {
    return (
        <div id={props.id}>
            <Link to={props.link}>
                <Button type="button">{props.text}</Button>
            </Link>
        </div>
    )
}
