import authWatch, { authorization } from '../auth';
import { getIsAuthorized, logout, authRequest, authSuccess, authFailure } from '../../ducks/auth';
import { select, put, call, takeEvery, take } from 'redux-saga/effects';
import { getTokenFromLocalStorage, setTokenToLocalStorage, removeTokenFromLocalStorage } from '../../localStorage';
import { setTokenApi, clearTokenApi, getTokenOwner } from '../../api';

describe('Сага authWatch', () => {
    const saga = authWatch();
    const token = 123;

    describe('Сценарий без токена авторизации в localstorage', () => {
        it('1) Проверка на авторизованность пользователя', () => {
            expect(saga.next().value).toEqual(select(getIsAuthorized));
        });

        it('2) Получение токена из Local Storage', () => {
            expect(saga.next().value).toEqual(call(getTokenFromLocalStorage));
        });

        it('3) Эффект take с ожиданием authorize', () => {
            expect(saga.next().value).toEqual(takeEvery(authRequest, authorization));
        });

        const authSaga = authorization();

        it('4) Отправляем полученный токен на setTokenApi', () => {
            expect(authSaga.next({ payload: token }).value).toEqual(call(setTokenApi, { payload: token }));

            //expect(saga.next({ payload: token }).value).toEqual(call(getTokenOwner, token));
        });

        //it('6) Эффект call setTokenToLocalStorage', () => {
        //    //expect(saga.next({ payload: token }).value).toEqual(call(setTokenToLocalStorage, token));
        //});

        //it('6) Эффект take logout', () => {
        //    expect(saga.next().value).toEqual(take(logout));
        //});
        //
        //it('7) Эффект call removeTokenFromLocalStorage', () => {
        //    expect(saga.next().value).toEqual(call(removeTokenFromLocalStorage));
        //});
        //
        //it('8) Эффект call clearTokenApi', () => {
        //    expect(saga.next().value).toEqual(call(clearTokenApi));
        //});
    });

    describe('Сценарий c токеном авторизации в Local Storage', () => {
        //it('1) Проверка на авторизованность пользователя', () => {
        //    expect(saga.next().value).toEqual(select(getIsAuthorized));
        //});
        //
        //it('2) Получение токена из Local Storage', () => {
        //    expect(saga.next().value).toEqual(call(getTokenFromLocalStorage));
        //});
        //
        //it('3) Action authSuccess - успешная авоторизация', () => {
        //    expect(saga.next({ payload: token }).value).toEqual(put(authSuccess()));
        //});
        //
        //it('4) Вызов setTokenApi с  токеном, полученным на предыдущем шаге', () => {
        //    expect(saga.next({ payload: token }).value).toEqual(call(setTokenApi, { payload: token }));
        //});
        //
        //it('5) Logout', () => {
        //    expect(saga.next().value).toEqual(take(logout));
        //});
        //
        //it('6) Вызов метода removeTokenFromLocalStorage', () => {
        //    expect(saga.next().value).toEqual(call(removeTokenFromLocalStorage));
        //});
        //
        //it('7) Вызов метода clearTokenApi', () => {
        //    expect(saga.next().value).toEqual(call(clearTokenApi));
        //});
    });
});