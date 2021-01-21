import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>

        <p>Current Price <strong>{props.price.toFixed(2)}</strong></p>

        {controls.map(control => {
            return <BuildControl
                key={control.label}
                label={control.label}
                //The method reference is called when the More button is clicked, so from there it identifies where the click was done and the data of the type us passed
                //upwards, so that here the ES6 arrow function can take the type as input parameter, since it's required in the BurguerBuilder component
                added={() => props.ingredientAdded(control.type)}
                removed={() => props.ingredientRemoved(control.type)}
                //here we disable or enable depending on the type of the control
                disabled={props.disabled[control.type]}
            />
        })}
        <button className={classes.OrderButton} disabled={!props.purchasable}>ORDER NOW</button>
    </div>
);

export default buildControls;