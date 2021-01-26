import React from "react";

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import Aux from "../../../hoc/Aux";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close]

    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            {/*Here we are showing the sideDrawer depending on the props that are being passed to this component*/}
            <div className={attachedClasses.join(' ')}>
                {/*This is the other way, by passing the height as a prop into the logo*/}
                {/*<Logo height="11%" />*/}
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    )
};


export default sideDrawer;