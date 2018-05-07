import { userRequest, userSuccess, userFailure, userFollowerRequest } from '../../ducks/users';
import { call, put, takeLatest } from 'redux-saga/effects';
import userWatch, { getUserData } from '../users';
import { getUserInformation, getTokenOwner } from '../../api';
import requestFlow from '../request';

describe('Сага userWatch', () => {
    it('Вызов метода takeLatest', () => {
        const sagaIterator = userWatch();

        expect(sagaIterator.next().value).toEqual(takeLatest([userRequest, userFollowerRequest], getUserData));
    });
});

describe('Сага getUserData:', () => {
    it('call getTokenOwner', () => {
        const action = userRequest();
        const saga = getUserData(action);

        expect(saga.next().value).toEqual(call(requestFlow, getTokenOwner, undefined));
    });

    it('call getUserInformation', () => {
        const action = { payload: 'login' };
        const saga = getUserData(action);

        expect(saga.next().value).toEqual(call(requestFlow, getUserInformation, 'login'));
    });

    it('Action userSuccess при успешном выполнении запроса', () => {
        const action = { payload: 'login' };
        const result = { data: { login: 'test', id: '1' } };
        const saga = getUserData(action);
        saga.next();

        expect(saga.next(result).value).toEqual(put(userSuccess(result.data)));
    });

    it('Action userFailure при ошибке запроса', () => {
        const action = { payload: 'login' };
        const error = new Error('error');
        const saga = getUserData(action);
        saga.next();

        expect(saga.throw(error).value).toEqual(put(userFailure(error)));
    });
});