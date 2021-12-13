import React from 'react'
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
var classNames = require("classnames");

export default function NavItem(props) {
    let navItemClasses = classNames("nav_item");
    let btnClasses = classNames("nav_button");
    return (
      <div id={props.id} className={navItemClasses}>
        <Link to={props.link}>
          <Button type="button" className={btnClasses}>
            {props.text}
          </Button>
        </Link>
      </div>
    );
}
