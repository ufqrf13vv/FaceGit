import React from 'react';
import { MemoryRouter, Link } from 'react-router-dom';
import Follower from './Follower';
import { shallow, mount } from 'enzyme';

describe('Компонент Follower', () => {
    const wrapper = shallow(<Follower />);

    it('Наличие аватара', () => {
        expect(wrapper.find('.app__follower-image')).toHaveLength(1);
    });

    it('Login пользователя передан через props', () => {
        const wrapper1 = shallow(<Follower login="login" />);
        console.log(wrapper1.instance().props);
        expect(wrapper1.prop('login')).to.equal(true);
    });

    it('Ссылка с логина пользователя ведет на /user/{user.login}', () => {

    });
});