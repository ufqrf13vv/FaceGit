import authReducer, { logout, authRequest, authSuccess, authFailure } from '../auth';

describe('Reducers auth:', () => {
    it('Action authRequest устанавливает isFetching = true', () => {
        const nextState = authReducer(
            {
                isFetching: true
            },
            authRequest());

        expect(nextState.isFetching).toEqual(true);
    });

    it('Action authSuccess устанавливает isAuthorize = true', () => {
        const nextState = authReducer(
            {
                isAuthorize: true
            },
            authSuccess());

        expect(nextState.isAuthorize).toEqual(true);
    });

    it('Action authFailure записывает ошибку', () => {
        const error = new Error('New error');
        const nextState = authReducer(
            {
                error: null
            },
            authFailure(error)
        );

        expect(nextState.error).toEqual(error);
    });

    it('Action logout - выход из системы', () => {
        const nextState = authReducer(
            {
                isAuthorize: false,
                isFetching: false,
                error: null
            },
            logout()
        );

        expect(nextState.isAuthorize).toEqual(false);
    });
});