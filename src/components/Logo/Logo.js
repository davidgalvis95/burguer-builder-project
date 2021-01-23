import React from 'react';

import burguerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css'

const logo = (props) => {
    return (
    <div className={classes.Logo}>
        <img src={burguerLogo} alt="MyBurguer"/>
    </div>
    )
};

export default logo;