import React from 'react';

import classes from './Input.module.css';

//This is a custom input component that will replace the default inputs that are created when those are used in the Checkout component
const input = (props) => {

    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={classes.InputElement}
                                  {...props.elementConfig}
                                  value={props.value}
                                  onChange={props.changed}/>
            break;
        case ('textarea'):
            inputElement = <textarea className={classes.InputElement}
                                     {...props.elementConfig}
                                     value={props.value}
                                     onChange={props.changed}/>
            break;
        //    Here we add the missing case that was the one that holds the select for the dropdown
        case ('select'):
            inputElement = (
                <select
                    className={classes.InputElement}
                    //this value is different than the one that is in the option, this is a value that is set when the user selects something
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => {
                        //whereas the value here is the one that is used to build the dropdown, either the one in the "value" or the display for the user
                        return <option key={option.value}
                                       value={option.value}>{
                            option.displayValue}
                        </option>
                    })}
                </select>
            )
            break;
        default:
            inputElement = <input className={classes.InputElement}
                                  {...props.elementConfig}
                                  value={props.value}
                                  onChange={props.changed}/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
        </div>
    )
}
export default input;