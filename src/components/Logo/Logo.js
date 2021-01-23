import React from 'react';

import burguerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css'

const logo = (props) => {
    return (
    //    This could be another way of doing the same, bypassing the height from th SideDrawer and the Toolbar depending on our needs
    // <div className={classes.Logo} style={{height: props.height}}>
    <div className={classes.Logo}>
        <img src={burguerLogo} alt="MyBurguer"/>
    </div>
    )
};

export default logo;