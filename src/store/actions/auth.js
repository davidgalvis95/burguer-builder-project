import * as actionTypes from './actionTypes';
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true

        }

        //TODO find the way to use the API_KEY
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]';

        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]';
        }

        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess());
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            })
    }
}