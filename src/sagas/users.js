import { call, put, takeLatest } from 'redux-saga/effects';
import { getTokenOwner, getUserInformation } from '../api';
import { userRequest, userSuccess, userFailure, userFollowerRequest } from '../ducks/users';

/**
 *
 * @param action
 */
function* getUserData(action) {
    try {
        let result;

        if (userRequest.toString() === action.type) {
            result = yield call(getTokenOwner, action.payload)
        } else {
            result = yield call(getUserInformation, action.payload);
        }
        yield put(userSuccess(result));
    } catch(error) {
        yield put(userFailure(error));
    }
}

export default function* userWatch() {
    yield takeLatest([userRequest, userFollowerRequest], getUserData)
}