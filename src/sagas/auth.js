import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import { getTokenOwner, setTokenApi, clearTokenApi } from '../api';
import { getTokenFromLocalStorage, setTokenToLocalStorage, removeTokenFromLocalStorage, } from '../localStorage';
import { getIsAuthorized, logout, authRequest, authSuccess, authFailure } from '../ducks/auth';

export function* authorization(action) {
    try {
        yield call(setTokenApi, action.payload);

        const result = yield call(getTokenOwner, action.payload);

        yield call(setTokenToLocalStorage, action.payload);
        yield put(authSuccess(result));
    } catch (error) {
        yield put(authFailure(error));
    }
}

export default function* authWatch() {
    while (true) {
        const isAuthorized = yield select(getIsAuthorized);
        const localStorageToken = yield call(getTokenFromLocalStorage);

        if (!isAuthorized || localStorageToken) {
            if (localStorageToken) {
                yield put(authSuccess());
            } else {
                yield takeEvery(authRequest, authorization);
            }
        }

        yield call(setTokenApi, localStorageToken);

        yield take(logout);

        yield call(removeTokenFromLocalStorage);
        yield call(clearTokenApi);
    }
}