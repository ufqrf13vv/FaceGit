import { handleActions, createActions } from 'redux-actions';

const {
    clearNetworkErrors,
    networkError
    } = createActions(
    'CLEAR_NETWORK_ERRORS',
    'NETWORK_ERROR'
);

const initialState = {
    error: null,
    message: null
};

export default handleActions(
    {
        [clearNetworkErrors]: (state, action) => ({
            ...state,
            error: null,
            message: null
        }),

        [networkError]: (state, action) => ({
            ...state,
            error: action.payload,
            message: action.payload.response.data.message
        })
    },
    initialState
);

export { clearNetworkErrors, networkError };

export const getIsNetworkErrorPresent = state => state.network.error != null;
export const getNetworkError = state => state.network.message;