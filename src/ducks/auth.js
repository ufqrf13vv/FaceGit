import { handleActions, createActions } from 'redux-actions';

const {
    authRequest,
    authSuccess,
    authFailure,
    logout
    } = createActions(
    'AUTH_REQUEST',
    'AUTH_SUCCESS',
    'AUTH_FAILURE',
    'LOGOUT'
);

const initialState = {
    isAuthorize: false,
    isFetching: false,
    error: null
};

export default handleActions(
    {
        [authRequest]: (state, action) => ({
            ...state,
            isAuthorize: false,
            isFetching: true,
            error: null
        }),

        [authSuccess]: (state, action) => ({
            ...state,
            isAuthorize: true,
            isFetching: false,
            error: null
        }),

        [authFailure]: (state, action) => ({
            ...state,
            isAuthorize: false,
            isFetching: false,
            error: action.payload
        }),

        [logout]: (state, action) => ({
            ...state,
            isAuthorize: false,
            isFetching: false,
            error: null
        })

    },
    initialState
);

export { logout, authRequest, authSuccess, authFailure };

export const getIsAuthorized = state => state.auth.isAuthorize;
