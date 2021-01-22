import React from 'react';

import classes from './Backdrop.module.css'

const backdrop = (props) => {
    //Whenever the backdrop component is clicked it will drive the Modal to disappear
    return props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null;
}

export default backdrop;