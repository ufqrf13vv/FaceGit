import React from 'react';
import { MemoryRouter, Link } from 'react-router-dom';
import Follower from './Follower';
import { shallow } from 'enzyme';

describe('Компонент Follower', () => {
    const wrapper = shallow(<Follower />);

    it('Наличие аватара', () => {
        expect(wrapper.find('.app__follower-image')).toHaveLength(1);
    });

    it('Login пользователя передан через props', () => {
        const element = shallow(<Follower login={'login'} />);

        expect(element.instance().props.login).toBe('login');
    });

    it('Ссылка с логина пользователя ведет на /user/{user.login}', () => {
        const userName = 'user';
        const element = shallow(<Follower login={userName} />);
        const link = element.findWhere(el => {
            return el.type() === Link && el.prop('to') === `/user/${userName}`;
        });

        expect(link).toHaveLength(1);
    });
});