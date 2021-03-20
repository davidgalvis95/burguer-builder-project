//this is an action creator
import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

//here is the async action creator which will call to a sync one
export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burguer-571ec-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                //here are the sync action creators
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                //here are the sync action creators
                dispatch(fetchIngredientsFailed())
            })
            // .catch(error => {})
    }
}