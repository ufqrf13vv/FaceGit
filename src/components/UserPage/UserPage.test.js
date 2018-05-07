import React from 'react';
import { UserPage } from './UserPage';
import { shallow } from 'enzyme';

describe('Компонент UserPage', () => {
    it('Loader, если props.isFetching === true', () => {
        const match = { params: { name: 'user' } };
        const userFollowerRequestMock = jest.fn();
        const wrapper = shallow(
            <UserPage
                match={match}
                userFollowerRequest={userFollowerRequestMock}
                userIsFetching={true} />
        );
        const loader = wrapper.find('Loader');

        expect(loader).toHaveLength(1);
    });

    it('Должно быть сообщение об отсутствии пользователя если isFetching === false && user == null', () => {
        const match = { params: { name: 'User123' } };
        const userFollowerRequestMock = jest.fn();
        const wrapper = shallow(
            <UserPage
                match={match}
                userFollowerRequest={userFollowerRequestMock}
                userIsFetching={false}
                user={null}
            />
        );
        const errorElement = wrapper.find('Error');

        expect(errorElement).toHaveLength(1);
    });

    describe('Верстка:', () => {
        const match = { params: { name: 'user' } };
        const userFollowerRequestMock = jest.fn();
        const restProps = {
            userIsFetching: false,
            userIsFetched: true,
            user: { data: { } }
        };
        const wrapper = shallow(
            <UserPage
                match={match}
                userFollowerRequest={userFollowerRequestMock}
                {...restProps}
            />
        );

        it('Аватар', () => {
            const avatar = wrapper.find('.app-user__photo img');

            expect(avatar).toHaveLength(1);
        });

        it('Login пользователя', () => {
            const login = wrapper.find('.app-user__login');

            expect(login).toHaveLength(1);
        });

        it('Количество фаловеров пользователя', () => {
            const loginElement = wrapper.find('.app-user__followers');

            expect(loginElement).toHaveLength(1);
        });

        it('Должен присутствовать компонент Followers', () => {
            expect(wrapper.find('Connect(Followers)')).toHaveLength(1);
        });

        it('У компонента Followers должен быть атрибут login с передачей значения через props', () => {
            const login = 'user';
            wrapper.setProps({ user: { login: login } });
            const loginProp = wrapper.find('Connect(Followers)').prop('login');

            expect(loginProp).toBe(login);
        });
    })
});