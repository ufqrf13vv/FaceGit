import { handleActions, createActions } from 'redux-actions';

const {
    followersRequest,
    followersSuccess,
    followersFailure
    } = createActions(
    'FOLLOWERS_REQUEST',
    'FOLLOWERS_SUCCESS',
    'FOLLOWERS_FAILURE'
);

const initialState = {
    data: {},
    error: null,
    isFetched: false,
    isFetching: false
};

export default handleActions(
    {
        [followersRequest]: (state, action) => ({
            ...state,
            isFetching: true,
            isFetched: false,
            data: {},
            error: null
        }),

        [followersSuccess]: (state, action) => ({
            ...state,
            data: action.payload,
            isFetched: true,
            isFetching: false,
            error: null
        }),

        [followersFailure]: (state, action) => ({
            ...state,
            error: action.payload,
            isFetched: true,
            isFetching: false
        })
    },
    initialState
);

export { followersRequest, followersSuccess, followersFailure };

export const getFollowers = state => state.followers.data;
export const getFollowersIsFetched = state => state.followers.isFetched;
export const getFollowersIsFetching = state => state.followers.isFetching;
export const getFollowersError = state => state.followers.error;