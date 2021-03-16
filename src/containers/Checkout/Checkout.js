import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

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
                    ingredients={this.props.ings}
                    checkoutCancelled = {this.checkoutCancelledHandler}
                    checkoutContinued = {this.checkoutContinuedHandler}
                />
                {/*The render is no longer needed due that ContactData will no longer pass the props from this component to the ContactData,
                ContactData will query them from Redux*/}
                <Route path={this.props.match.path + '/contact-data'}
                       component={ContactData}/>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps) (Checkout);