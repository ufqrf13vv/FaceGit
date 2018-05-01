import { fork } from 'redux-saga/effects';
import authWatch from './auth';
import userWatch from './users';
import followersWatch from './followers';

export default function*() {
    yield fork(authWatch);
    yield fork(userWatch);
    yield fork(followersWatch);
}
