import { handleActions, createActions } from 'redux-actions';

const {
    userRequest,
    userSuccess,
    userFailure,
    userFollowerRequest
    } = createActions(
    'USER_REQUEST',
    'USER_SUCCESS',
    'USER_FAILURE',
    'USER_FOLLOWER_REQUEST'
);

const initialState = {
    data: {},
    error: null,
    isFetched: false,
    isFetching: false
};

export default handleActions(
    {
        [userRequest]: (state, action) => ({
            ...state,
            isFetching: true,
            isFetched: false,
            data: {},
            error: null
        }),

        [userSuccess]: (state, action) => ({
            ...state,
            isFetched: true,
            isFetching: false,
            data: action.payload,
            error: null
        }),

        [userFailure]: (state, action) => ({
            ...state,
            error: action.payload,
            isFetching: false,
            isFetched: true
        })
    },
    initialState
);

export { userRequest, userSuccess, userFailure, userFollowerRequest };

export const getUser = state => state.users.data;
export const getUserIsFetched = state => state.users.isFetched;
export const getUserIsFetching = state => state.users.isFetching;
export const getUserError = state => state.users.error;