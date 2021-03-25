import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const burguerBuilder = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_INGREDIENT:
            const updatedAddIng = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
            const updatedAddIngs = updateObject(state.ingredients, updatedAddIng);
            const updatedAddState = {
                ingredients: updatedAddIngs,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedAddState)
        case actionTypes.REMOVE_INGREDIENT:
            const updatedRemoveIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
            const updatedRemoveIngs = updateObject(state.ingredients, updatedRemoveIng);
            const updatedRemoveState = {
                ingredients: updatedRemoveIngs,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedRemoveState)
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false
            })
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { error: true });
        default:
            return state;
    }
};

export default burguerBuilder;