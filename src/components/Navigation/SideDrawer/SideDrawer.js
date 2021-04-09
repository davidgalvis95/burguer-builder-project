import React from "react";

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import Aux from "../../../hoc/Aux/Aux";
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
            {/*Here we say that the side drawer should be closed if we click on it, not only when clicking the backdrop*/}
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                {/*This is the other way, by passing the height as a prop into the logo*/}
                {/*<Logo height="11%" />*/}
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    )
};


export default sideDrawer;