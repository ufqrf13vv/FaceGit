import { call, put, takeLatest } from 'redux-saga/effects';
import { followersRequest, followersSuccess, followersFailure } from '../ducks/followers';
import { getUserFollowers } from '../api';
import requestFlow from './request';

export function* getFollowersData(action) {
    try {
        const result = yield call(requestFlow, getUserFollowers, action.payload);

        yield put(followersSuccess(result.data));
    } catch (error) {
        yield put(followersFailure(error));
    }
}

export default function* followersWatch() {
    yield takeLatest(followersRequest, getFollowersData);
}