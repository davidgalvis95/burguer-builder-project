import React from 'react';

import classes from './Input.module.css';

//This is a custom input component that will replace the default inputs that are created when those are used in the Checkout component
const input = (props) => {

    let inputElement = null;

    switch (props.elementType){
        case ('input'):
            inputElement = <input className={classes.InputElement}
                                  {...props.elementConfig}
                                  value={props.value}/>
            break;
        case ('textarea'):
            inputElement = <textarea className={classes.InputElement}
                                     {...props.elementConfig}
                                     value={props.value}/>
            break;
        default:
            inputElement = <input className={classes.InputElement}
                                  {...props.elementConfig}
                                  value={props.value}/>
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
        </div>
    )
}
export default input;