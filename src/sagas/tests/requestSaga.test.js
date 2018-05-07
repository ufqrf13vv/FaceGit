import { call, put, select } from 'redux-saga/effects';
import requestSaga from '../request';
import { followersSuccess } from '../../ducks/followers';
import { clearNetworkErrors, networkError, getIsNetworkErrorPresent } from '../../ducks/network';
import { logout } from '../../ducks/auth';

describe('Сага request', () => {
    const followers = [{ id: 1, name: 'user' }];
    const saga = requestSaga(followersSuccess, followers);

    describe('Ошибок нет:', () => {
        it('1) Вызов функции call(fn, args)', () => {
            expect(saga.next().value).toEqual(call(followersSuccess, followers));
        });

        it('2) Эффект getIsNetworkErrorPresent', () => {
            expect(saga.next().value).toEqual(select(getIsNetworkErrorPresent));
        });

        it('3) Action clearNetworkErrors', () => {
            expect(saga.next(true).value).toEqual(put(clearNetworkErrors()));
        });
    });

    describe('Сетевая ошибка:', () => {
        it('1) Action networkError', () => {
            const error = { response: { status: 401 } };

            expect(saga.throw(error).value).toEqual(put(networkError(error)));
        });

        it('2) Action logout', () => {
            expect(saga.next().value).toEqual(put(logout()));
        });
    });
});