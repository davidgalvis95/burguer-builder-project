import React from "react";

import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div style={{color:'white'}}>MENU</div>
        <Logo/>
        <nav>
            ...
        </nav>
    </header>
);


export default toolbar;