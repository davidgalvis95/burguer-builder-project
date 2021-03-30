import React from "react";

import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => (

    <header className={classes.Toolbar}>
        <DrawerToggle style={{color: 'white'}} clicked={props.showSideDrawer}/>
        {/*This is the other way, by passing the height as a prop into the logo*/}
        {/*<Logo height="80%" />*/}
        <div className={classes.Logo}>
            <Logo/>
        </div>
        {/*This is the class taken from the one that only is displayed in desktop*/}
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
    </header>
);


export default toolbar;