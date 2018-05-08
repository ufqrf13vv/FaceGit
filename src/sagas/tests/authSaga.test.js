import authWatch, { authorization } from '../auth';
import { getIsAuthorized, logout, authRequest, authSuccess, authFailure } from '../../ducks/auth';
import { select, put, call, takeEvery, take } from 'redux-saga/effects';
import { getTokenFromLocalStorage, setTokenToLocalStorage, removeTokenFromLocalStorage } from '../../localStorage';
import { setTokenApi, clearTokenApi, getTokenOwner } from '../../api';

describe('Сага authWatch', () => {
    describe('Сценарий без токена авторизации в localstorage', () => {
        const saga = authWatch();
        const token = 123;

        it('1) Проверка на авторизованность пользователя', () => {
            expect(saga.next().value).toEqual(select(getIsAuthorized));
        });

        it('2) Получение токена из Local Storage', () => {
            expect(saga.next().value).toEqual(call(getTokenFromLocalStorage));
        });

        it('3) Эффект take с ожиданием саги authorization', () => {
            expect(saga.next().value).toEqual(takeEvery(authRequest, authorization));
        });

        describe('Успешная авторизация', () => {
            const action = {payload: token};
            const authSaga = authorization(action);

            it('1) Отправляем полученный токен на setTokenApi', () => {
                expect(authSaga.next(action).value).toEqual(call(setTokenApi, token));
            });

            it('2) Вызов getTokenOwner - запрос на получении данных о пользователе', () => {
                expect(authSaga.next(action).value).toEqual(call(getTokenOwner, token));
            });

            it('3) Вызов setTokenToLocalStorage - запись токена в Local Storage', () => {
                expect(authSaga.next().value).toEqual(call(setTokenToLocalStorage, token));
            });

            it('4) Action authSuccess - авторизация прошла успешно', () => {
                expect(authSaga.next().value).toEqual(put(authSuccess()));
            });
        });

        describe('Ошибка при авторизации', () => {
            const action = {payload: token};
            const authSaga = authorization(action);

            it('1) Отправляем полученный токен на setTokenApi', () => {
                expect(authSaga.next(action).value).toEqual(call(setTokenApi, token));
            });

            it('2) Вызов getTokenOwner - запрос на получении данных о пользователе', () => {
                expect(authSaga.next(action).value).toEqual(call(getTokenOwner, token));
            });

            it('3) Action authFailure - ошибка авторизации', () => {
                const error = new Error('error');

                expect(authSaga.throw(error).value).toEqual(put(authFailure(error)));
            });
        });
    });

    describe('Сценарий c токеном авторизации в Local Storage', () => {
        const saga = authWatch();
        const token = 123;

        it('1) Проверка на авторизованность пользователя', () => {
            expect(saga.next().value).toEqual(select(getIsAuthorized));
        });

        it('2) Получение токена из Local Storage', () => {
            expect(saga.next().value).toEqual(call(getTokenFromLocalStorage));
        });

        it('3) Action authSuccess - успешная авоторизация', () => {
            expect(saga.next({payload: token}).value).toEqual(put(authSuccess()));
        });

        it('4) Вызов setTokenApi с  токеном, полученным на предыдущем шаге', () => {
            expect(saga.next({payload: token}).value).toEqual(call(setTokenApi, {payload: token}));
        });

        it('5) Logout', () => {
            expect(saga.next().value).toEqual(take(logout));
        });

        it('6) Вызов метода removeTokenFromLocalStorage', () => {
            expect(saga.next().value).toEqual(call(removeTokenFromLocalStorage));
        });

        it('7) Вызов метода clearTokenApi', () => {
            expect(saga.next().value).toEqual(call(clearTokenApi));
        });
    });
});