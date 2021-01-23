import React from "react";

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'

const sideDrawer = (props) => {
    return (
        <div className={classes.SideDrawer}>
            {/*This is the other way, by passing the height as a prop into the logo*/}
            {/*<Logo height="11%" />*/}
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
    )
};


export default sideDrawer;