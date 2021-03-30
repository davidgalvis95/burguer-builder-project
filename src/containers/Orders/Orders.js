import React, {Component} from 'react';

import Order from '../../components/Order/Order'
import axios from "../../axios-orders";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner'


//TODO try to add a delete button here to delete and handle orders
class Orders extends Component {

    //Here we use the component did mount because the axios loading will be called only when the component is loaded, no when is updated or any other action
    //also because the component will be called once
    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        let orders = <Spinner/>;
        if (!this.props.loading) {
            orders = (this.props.orders.map(order => {
                return <Order key={order.id}
                              ingredients={order.ingredients}
                              price={order.price}/>
            }))
        }

        return <div>{orders}</div>;

    }
}

const
    mapStateToProps = state => {
        return {
            orders: state.order.orders,
            loading: state.order.loading,
            token: state.auth.token
        }
    }

const
    mapDispatchtoProps = dispatch => {
        return {
            onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
        }
    }

//Error handler that was created to intercept errors from axios
export default connect(mapStateToProps, mapDispatchtoProps) (withErrorHandler(Orders, axios));