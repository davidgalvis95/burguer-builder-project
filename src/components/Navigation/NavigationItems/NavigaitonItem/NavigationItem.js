import React from "react";
import {NavLink} from "react-router-dom";

import classes from './NavigationItem.module.css'

const navigationItem = (props) => (
        <li className={classes.NavigationItem}>
            <NavLink
                //since this is a NavLink we do not need the active class to be set up that way
                activeClassName={classes.active}
                //This is to avoid the the general paths to get passed and match the derived paths e.g "/" will also match "/orders"
                exact={props.exact}
                to={props.link}>
                {props.children}
            </NavLink>
        </li>
);


export default navigationItem;