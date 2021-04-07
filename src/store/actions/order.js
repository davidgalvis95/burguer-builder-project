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

export const purchaseBuguer = (orderData, token) => {
    return dispatch => {
        //we do this using the dispatch because we want the purchaseBurguerStart to reach the reducer so that we can perform
        // action with the actionTypes.PURCHASE_BURGUER_START
        dispatch(purchaseBurguerStart())
        axios.post('/orders.json?auth=' + token, orderData)
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

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrders = (token, userId) => {
    //we could use the getState here but
    return dispatch => {
        dispatch(fetchOrdersStart());
        //The orderBy property tells firebase to order by that, but not just that but also tells that we can filter data by that parameter
        //and that is exactly what we want to do, so the equalTo param, tells firebase that the orderBy para should be equal to what we are passing there
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
            .then(res => {
            console.log(res.data);
            const fetchedOrders = [];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        }).catch(err => {
            dispatch(fetchOrdersFail(err))
        })
    }
}