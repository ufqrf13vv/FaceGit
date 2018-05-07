import { call, put, takeLatest } from 'redux-saga/effects';
import { followersRequest, followersSuccess, followersFailure } from '../../ducks/followers';
import followersSaga, { getFollowersData } from '../followers';
import requestFlow from '../request';
import { getUserFollowers } from '../../api';

describe('Сага followersWatch:', () => {
    it('Вызов метода takeLatest', () => {
        const sagaIterator = followersSaga();

        expect(sagaIterator.next().value).toEqual(takeLatest(followersRequest, getFollowersData));
    });
});

describe('Сага followers:', () => {
    it('Вызов getUserFollowers с правильными аргументами', () => {
        const login = 'user';
        const action = { payload: 'user' };
        const saga = getFollowersData(action);

        expect(saga.next().value).toEqual(call(requestFlow, getUserFollowers, login));
    });

    it('Должен отправляться action fetchUserSuccess с followers при успешном получении данных', () => {
        const action = { payload: 'user' };
        const saga = getFollowersData(action);
        const followers = [{ id: 1, name: 'Bob' }];
        const result = { data: followers };

        saga.next();

        expect(saga.next(result).value).toEqual(
            put(followersSuccess(result.data))
        );
    });

    it('Должен отправляться action fetchUserFailure при получении ошибки', () => {
        const action = { payload: 'user' };
        const error = new Error('error');
        const saga = getFollowersData(action);

        saga.next();

        expect(saga.throw(error).value).toEqual(put(followersFailure(error)));
    });
});