import React from "react";

import classes from './NavigationItems.module.css'
import NavigationItem from './NavigaitonItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        {/*If we do need to pass a boolean property to a chile component this is the way to do so, works the same as active={true}*/}
        {/*So far the property is hardcoded*/}
        {/*We no longer need this active since the active context is now set in the NavLink component*/}
        <NavigationItem link="/" exact>Burguer builder</NavigationItem>
        {/*here we will not let the orders nav item to appear if the user is not authenticated*/}
        {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem>: null}
        {!props.isAuthenticated ?
            <NavigationItem link="/auth">Authenticate</NavigationItem>:
            <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);


export default navigationItems;