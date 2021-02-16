import React from 'react';

import Burguer from '../../../components/Burguer/Burguer';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {

    return(
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width:'100%', margin:'auto'}}>
                {/*This component will be used to display the burguer with the ingredients coming from checkout component*/}
                <Burguer ingredients={props.ingredients}/>
            </div>
            {/*Here are the same buttons we have used in the OrderSummary component, with a clicked functionality to be implemented*/}
            <Button btnType="Danger" clicked>CANCEL</Button>
            <Button btnType="Success" clicked>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;

