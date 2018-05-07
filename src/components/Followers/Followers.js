import React, { Component } from 'react';
import { connect } from 'react-redux';
import { followersRequest, getFollowers, getFollowersIsFetching, getFollowersIsFetched, getFollowersError } from '../../ducks/followers';
//  Components
import Follower from '../Follower';
import Error from '../Error';
import Loader from '../Loader';

export class Followers extends Component {

    componentDidMount() {
        const { login } = this.props;

        this.props.followersRequest(login);
    };

    followerList() {
        const { followers } = this.props;

        return followers.map(item => {
            return (
                <Follower
                    key={item.id}
                    login={item.login}
                    avatar={item.avatar_url}
                />
            );
        });
    }

    render() {
        const { followersIsFetched, followersIsFetching, followersError } = this.props;

        if (followersIsFetching) {
            return (
                <Loader isLoading={true}/>
            )
        }

        if (followersError) {
            return (
                <Error
                    isError={true}
                    errorText={'Фолловеры не найдены!!!'}/>
            )
        }

        return (
            <div className="app__followers">
                {followersIsFetched && this.followerList()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    followers: getFollowers(state),
    followersIsFetching: getFollowersIsFetching(state),
    followersIsFetched: getFollowersIsFetched(state),
    followersError: getFollowersError(state)
});

const mapDispatchToProps = { followersRequest };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Followers);