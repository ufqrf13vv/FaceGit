import usersReducer, { userRequest, userSuccess, userFailure } from '../users';

describe('Reducers users:', () => {
    describe('data:', () => {
        it('Action userSuccess записывает action.payload в data', () => {
            const user = { id: 1, login: 'user' };
            const nextState = usersReducer({ data: null }, userSuccess(user));

            expect(nextState.data).toEqual(user);
        });

        it('Action userRequest очищает data', () => {
            const user = { someKey: 'some value' };
            const nextState = usersReducer({ data: user }, userRequest());

            expect(nextState.data).toEqual(null);
        });
    });

    describe('error:', () => {
        it('Action userFailure записывает ошибку в error', () => {
            const error = new Error('error');
            const nextState = usersReducer({ error: null }, userFailure(error));

            expect(nextState.error).toEqual(error);
        });

        it('Action userRequest очищает поле error', () => {
            const nextState = usersReducer(
                { error: 'Some error' },
                userRequest()
            );

            expect(nextState.error).toEqual(null);
        });

        it('Action userSuccess очищает поле error', () => {
            const nextState = usersReducer(
                { error: 'Some error' },
                userSuccess()
            );
            expect(nextState.error).toEqual(null);
        });
    });

    describe('isFetching:', () => {
        it('если приходит action userRequest(загрузка данных), isFetching = true', () => {
            const nextState = usersReducer(
                {
                    isFetching: false
                },
                userRequest()
            );

            expect(nextState.isFetching).toEqual(true);
        });

        it('если приходит action userSuccess(данные получены), isFetching = false', () => {
            const nextState = usersReducer(
                {
                    isFetching: true
                },
                userSuccess()
            );

            expect(nextState.isFetching).toEqual(false);
        });

        it('если приходит action userFailure(ошибка загрузки данных), isFetching = false', () => {
            const nextState = usersReducer(
                {
                    isFetching: true
                },
                userFailure()
            );

            expect(nextState.isFetching).toEqual(false);
        });
    });

    describe('isFetched:', () => {
        it('если приходит action userRequest(загрузка данных), isFetched = false', () => {
            const nextState = usersReducer(
                {
                    isFetched: true
                },
                userRequest()
            );

            expect(nextState.isFetched).toEqual(false);
        });

        it('если приходит action userSuccess(данные получены), isFetched = true', () => {
            const nextState = usersReducer(
                {
                    isFetched: false
                },
                userSuccess()
            );

            expect(nextState.isFetched).toEqual(true);
        });

        it('если приходит action userFailure(ошибка загрузки данных), isFetched = true', () => {
            const nextState = usersReducer(
                {
                    isFetched: false
                },
                userFailure()
            );
            expect(nextState.isFetched).toEqual(true);
        });
    });
});