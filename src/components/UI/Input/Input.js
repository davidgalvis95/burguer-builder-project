import React from 'react';

import classes from './Input.module.css';

//This is a custom input component that will replace the default inputs that are created when those are used in the Checkout component
const input = (props) => {

    let inputElement;
    const inputClasses = [classes.InputElement];

    let validationError = null;
    if(props.invalid && props.shouldValidate && props.touched && props.abandoned){
        inputClasses.push(classes.Invalid);
        // console.log(props.errorMsg)
        validationError = <p className={classes.ValidationError}>{props.errorMsg}</p>;
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')}
                                  {...props.elementConfig}
                                  value={props.value}
                                  onChange={props.changed}
                                  onSelect={props.selected}
                                  id={props.elementId}/>
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')}
                                     {...props.elementConfig}
                                     value={props.value}
                                     onChange={props.changed}
                                     onSelect={props.selected}
                                     id={props.elementId}/>
            break;
        //    Here we add the missing case that was the one that holds the select for the dropdown
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    //this value is different than the one that is in the option, this is a value that is set when the user selects something
                    value={props.value}
                    onChange={props.changed}
                    onSelect={props.selected}
                    id={props.elementId}>
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
            inputElement = <input className={inputClasses.join(' ')}
                                  {...props.elementConfig}
                                  value={props.value}
                                  onChange={props.changed}
                                  onSelect={props.selected}
                                  id={props.elementId}/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}
export default input;