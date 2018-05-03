import followersReducer, { followersRequest, followersSuccess, followersFailure } from '../followers';

describe('Reducers followers:', () => {
    describe('data:', () => {
        it('Action followersRequest очищает data', () => {
            const followers = [{ id: 1, login: 'user' }];
            const nextState = followersReducer(
                { data: followers },
                followersRequest()
            );

            expect(nextState.data).toEqual({});
        });

        it('Action followersSuccess наполняют данными data', () => {
            const followers = [{ id: 1, login: 'user' }];
            const nextState = followersReducer(
                { id: [] },
                followersSuccess(followers)
            );

            expect(nextState.data).toEqual(followers);
        });
    });

    describe('error:', () => {
        it('Action followersRequest очищает поле error', () => {
            const nextState = followersReducer(
                { error: 'Some error' },
                followersRequest()
            );

            expect(nextState.error).toEqual(null);
        });

        it('Action followersSuccess очищают поле error', () => {
            const nextState = followersReducer(
                { error: 'Some error' },
                followersSuccess()
            );

            expect(nextState.error).toEqual(null);
        });

        it('Action followersFailure записывает ошибку в поле error', () => {
            const error = new Error('New error');
            const nextState = followersReducer(
                { error: null },
                followersFailure(error)
            );

            expect(nextState.error).toEqual(error);
        });
    });

    describe('isFetching:', () => {
        it('Action followersRequest, isFetching = true', () => {
            const nextState = followersReducer(
                {
                    isFetching: false
                },
                followersRequest()
            );

            expect(nextState.isFetching).toEqual(true);
        });

        it('Action followersSuccess, isFetching = false', () => {
            const nextState = followersReducer(
                {
                    isFetching: true
                },
                followersSuccess()
            );

            expect(nextState.isFetching).toEqual(false);
        });

        it('Action followersFailure, isFetching = false', () => {
            const nextState = followersReducer(
                {
                    isFetching: true
                },
                followersFailure()
            );

            expect(nextState.isFetching).toEqual(false);
        });
    });

    describe('isFetched:', () => {
        it('Action followersRequest, isFetched = false', () => {
            const nextState = followersReducer(
                {
                    isFetched: true
                },
                followersRequest()
            );

            expect(nextState.isFetched).toEqual(false);
        });

        it('Action followersSuccess, isFetched = true', () => {
            const nextState = followersReducer(
                {
                    isFetched: false
                },
                followersSuccess()
            );

            expect(nextState.isFetched).toEqual(true);
        });

        it('Action followersFailure, isFetched = true', () => {
            const nextState = followersReducer(
                {
                    isFetched: false
                },
                followersFailure()
            );

            expect(nextState.isFetched).toEqual(true);
        });
    });
});