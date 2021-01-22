import React from "react";

import classes from './Toolbar.module.css'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div style={{color:'white'}}>MENU</div>
        <div style={{color:'white'}}>LOGO</div>
        <nav>
            ...
        </nav>
    </header>
);


export default toolbar;