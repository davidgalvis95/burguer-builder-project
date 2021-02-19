import React, {Component} from 'react';
import {Route} from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

    state = {
        ingredients: null,
        price:0
    }

    componentWillMount() {
        //the URLSearchParams is an object that takes the query params and builds an array of pairs with each param like:
        //[['key','value'], ['key','value']] for each param that is passed
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price =0;
        for(let param of query.entries()){
            //['salad', '1']
            if(param[0] === 'price'){
                price = param[1];
            }else{
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients, price: price})
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