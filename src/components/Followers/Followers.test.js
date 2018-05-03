import React from 'react';
import { Followers } from './Followers';
import { shallow } from 'enzyme';

describe('Клмпонент Followers', () => {
    it('Наличие метода componentDidMount', () => {
        const followersRequestMock = jest.fn();
        const wrapper = shallow(
            <Followers followersRequest={followersRequestMock}/>
        );

        expect(wrapper.instance().componentDidMount).toBeDefined();
    });

    it('Лоадер, если isFetcing === true', () => {
        const followersRequestMock = jest.fn();
        const wrapper = shallow(
            <Followers
                followersRequest={followersRequestMock}
                followersIsFetching={true} />
        );
        const loader = wrapper.find('Loader');

        expect(loader).toHaveLength(1);
    });

    it('Возвращаются компоненты Followers в том количестве, в котором передаются в props.followers', () => {
        const followersRequestMock = jest.fn();
        const followers = [{ id: 1 }, { id: 2 }];
        const wrapper = shallow(
            <Followers
                followersRequest={followersRequestMock}
                followers={followers}
                followersIsFetched={true}
                followersIsFetching={false} />
        );

        expect(wrapper.find('Follower')).toHaveLength(followers.length);
    });
});