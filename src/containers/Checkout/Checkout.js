import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";
import * as actions from '../../store/actions/index'

class Checkout extends Component {

    //Adding the onInitPurchase here is too late, because while it runs before the render method,
    //it does not prevent the render to be run with the previous props where the purchased state property is true yet
    //therefore is better to call this prop function right before this component is called, it means in the BurguerBuilder
    // componentWillMount() {
    //     this.props.onInitPurchase();
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        //{/*So far the ingredients we will pass here will be dummy ones*/}
        let summary = <Redirect to="/"/>
        if (this.props.ings) {
            //When the purchase has been completed the we get redirected to home
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (<div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                {/*The render is no longer needed due that ContactData will no longer pass the props from this component to the ContactData,
                ContactData will query them from Redux*/}
                <Route path={this.props.match.path + '/contact-data'}
                       component={ContactData}/>

            </div>)
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);