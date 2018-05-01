import { call, put, takeLatest } from 'redux-saga/effects';
import { followersRequest, followersSuccess, followersFailure } from '../ducks/followers';
import { getUserFollowers } from '../api';

function* getFollowersData(action) {
    try {
        const result = yield call(getUserFollowers, action.payload);

        yield put(followersSuccess(result.data));
    } catch (error) {
        yield put(followersFailure(error));
    }
}

export default function* followersWatch() {
    yield takeLatest(followersRequest, getFollowersData);
}