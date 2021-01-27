import React, {Component} from 'react';

import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

//We have converted the OrderSummary component into class based one in order to see the state changes
class OrderSummary extends Component{

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[OrderSummary] updated')
    }

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients).map(ingredientKey => {
            return (
                <li key={ingredientKey}>
                    {/*Here to add the style we need to add the double square brackets */}
                    <span
                        style={{textTransform: 'capitalize'}}>{ingredientKey}</span> : {this.props.ingredients[ingredientKey]}
                </li>
            );
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burguer with the following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;