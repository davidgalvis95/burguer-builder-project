import * as actionTypes from './actionTypes';
import axios from "axios";
import {dispatch} from "jest-circus/build/state";

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

export const logout = () => {
    //When logging out we'll remove the properties saved in localstorage
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        },expirationTime * 1000)
    };
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true

        }

        //this api key identifies the application to firebase
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCyAYmx6jJbSAKwsEuit9l-hJZ23JSR8uc';

        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCyAYmx6jJbSAKwsEuit9l-hJZ23JSR8uc';
        }

        axios.post(url, authData)
            .then(response => {
                console.log(response);
                //The following 3 lines are don to store the token that is used to send requests when authenticated
                //the expiration date is to compare where to logout by timeout, because in firebase the token expires after an hour
                const expirationDate = new Date( new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                //According to firebase docs we can get the user data from a new endpoint but here we can also do it with localstorage for simplicity
                localStorage.setItem('userId', response.data.localId);
                //These are the fields we receive from firebase when doing the needed modifications
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                //this is the object that holds the expiration time of the session
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = localStorage.getItem('expirationDate');
            if(expirationDate <= new Date()){
                dispatch(logout());
            }else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId));
                //is better to use the getTime function to make comparisons of time like the one below, also
                //since this one produces a value in milliseconds, and the checkAuthTimeout receives seconds, then we divide it into 1000
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}