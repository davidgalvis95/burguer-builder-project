import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const purchaseBurguerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
}

export const purchaseBurguerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_FAIL,
        error: error
    };
}

export const purchaseBuguerStart = (orderData) => {
    return dispatch => {
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response);
                dispatch(purchaseBurguerSuccess(response.data, orderData))
                // this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                dispatch(purchaseBurguerFail((error)))
            });
    }
}