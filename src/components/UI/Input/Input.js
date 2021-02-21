import React from 'react';

import classes from './Input.module.css';

//This is a custom input component that will replace the default inputs that are created when those are used in the Checkout component
const input = (props) => {

    let inputElement = null;

    switch (props.inputtype){
        case ('input'):
            inputElement = <input className={classes.InputElement} {...props}/>
            break;
        case ('textarea'):
            inputElement = <textarea className={classes.InputElement} {...props}/>
            break;
        default:
            inputElement = <input className={classes.InputElement} {...props}/>
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
        </div>
    )
}
export default input;