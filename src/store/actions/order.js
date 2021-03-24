import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const purchaseBurguerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
}

export const purchaseBurguerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGUER_START
    }
}

export const purchaseBurguerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_FAIL,
        error: error
    };
}

export const purchaseBuguer = (orderData) => {
    return dispatch => {
        //we do this using the dispatch because we want the purchaseBurguerStart to reach the reducer so that we can perform
        // action with the actionTypes.PURCHASE_BURGUER_START
        dispatch(purchaseBurguerStart())
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response);
                dispatch(purchaseBurguerSuccess(response.data.name, orderData))
                // this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                dispatch(purchaseBurguerFail((error)))
            });
    }
}