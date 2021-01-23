import React from "react";

import classes from './NavigationItems.module.css'
import NavigationItem from './NavigaitonItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        {/*If we do need to pass a boolean property to a chile component this is the way to do so, works the same as active={true}*/}
        {/*So far the property is hardcoded*/}
        <NavigationItem link="/" active>Burguer builder</NavigationItem>
        <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
);


export default navigationItems;