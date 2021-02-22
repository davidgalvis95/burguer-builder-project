import React, {Component} from 'react';
import {Route} from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ingredients: this.queryParamsBuilder().ingredients,
            price: this.queryParamsBuilder().price
        }
    }

    queryParamsBuilder = () => {
        const query = new URLSearchParams(this.props.location.search);
        const checkoutVariables = {
            ingredients: {},
            price: 0
        };

        for(let param of query.entries()){
            //['salad', '1']
            if(param[0] === 'price'){
                checkoutVariables.price = param[1];
            }else{
                //TODO this will be needed as a constructor and not a will mount hook
                checkoutVariables.ingredients[param[0]] = +param[1];
            }
        }
        return checkoutVariables;
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        //{/*So far the ingredients we will pass here will be dummy ones*/}
        return(
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled = {this.checkoutCancelledHandler}
                    checkoutContinued = {this.checkoutContinuedHandler}
                />
                {/*If we place a route here inside this component instead that in the main component where all the routes reside, it will create a nested component*/}
                <Route path={this.props.match.path + '/contact-data'} render={(props) => (
                    <ContactData
                    ingredients={this.state.ingredients}
                    price={this.state.price}
                    {...props}/>
                    )}/>

            </div>
        )
    }
}

export default Checkout;