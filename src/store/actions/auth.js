import * as actionTypes from './actionTypes';
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

//This piece of the code will be refactored so that it gets the userId and token
// instead of the whole firebase object response
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
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
                //These are the fields we receive from firebase when doing the needed modifications
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            })
    }
}