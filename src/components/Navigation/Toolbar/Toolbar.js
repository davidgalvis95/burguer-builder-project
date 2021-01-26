import React from "react";

import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props) => (

    <header className={classes.Toolbar}>
        <div style={{color: 'white'}} onClick={props.showSideDrawer}>MENU</div>
        {/*This is the other way, by passing the height as a prop into the logo*/}
        {/*<Logo height="80%" />*/}
        <div className={classes.Logo}>
            <Logo/>
        </div>
        {/*This is the class taken from the one that only is displayed in desktop*/}
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);


export default toolbar;