import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
    orders:[],
    loading: false,
    purchased: false
}


const purchaseBurguerSuccessProcessor = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId})
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
}

const fetchOrdersSuccessProcessor = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    })
}


const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.PURCHASE_INIT: return updateObject(state, {purchased: false});
        case actionTypes.PURCHASE_BURGUER_START: return updateObject(state, {loading: false});
        case actionTypes.PURCHASE_BURGUER_SUCCESS: return  purchaseBurguerSuccessProcessor(state, action);
        case actionTypes.PURCHASE_BURGUER_FAIL: return updateObject(state, {loading: false})
        case actionTypes.FETCH_ORDERS_START: return updateObject(state, {loading: true})
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccessProcessor(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return updateObject(state, {loading: false})
        default:
            return state;
    }
}

export default reducer;