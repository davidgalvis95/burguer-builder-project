import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer test', () => {
    it('should return the initial state', () => {
        //here we expect the initial state when passing something that is not recognized
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    });

    it('should store the token upon login', () => {
        //here we expect the initial state when passing something that is not recognized
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'token',
            userId: 'userId'
        })).toEqual({
            token: 'token',
            userId: 'userId',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    });
})