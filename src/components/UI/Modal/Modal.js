import React from 'react';

import classes from './Modal.module.css'
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => {
    return(
        //This aux is added to hold the ability of returning a single JSX object which contains 2 components, now adding the Backdrop one
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)': 'translateY(-100)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Aux>
    )
}

export default modal;