import networkReducer, { clearNetworkErrors, networkError } from '../network';

describe('Reducers network:', () => {
    const message = 'Error message';

    describe('error:', () => {
        it('Action clearNetworkErrors очищает поле error', () => {
            const error = { response: { data: { message: message } } };
            const nextState = networkReducer(
                { error },
                clearNetworkErrors()
            );

            expect(nextState.error).toEqual(null);
        });

        it('Action networkError записывает ошибку в  error', () => {
            const error = { response: { data: { message: message } } };
            const nextState = networkReducer(
                { error: null, message: null },
                networkError(error)
            );

            expect(nextState.error).toEqual(error);
        });
    });

    describe('поле message', () => {
        it('Action clearNetworkErrors очищает поле message', () => {
            const nextState = networkReducer(
                { message: message },
                clearNetworkErrors()
            );

            expect(nextState.message).toEqual(null);
        });

        it('Action networkError записывает сообщение в message', () => {
            const error = { response: { data: { message: message } } };
            const nextState = networkReducer(
                { error: null, message: null },
                networkError(error)
            );

            expect(nextState.message).toEqual(message);
        });
    });
});