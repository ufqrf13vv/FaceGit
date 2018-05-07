import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userRequest, userFollowerRequest, getUser, getUserIsFetched, getUserIsFetching, getUserError } from '../../ducks/users';
import { getTokenFromLocalStorage } from '../../localStorage';
//  Components
import Followers from '../Followers';
import Error from '../Error';
import Loader from '../Loader';

export class UserPage extends Component {

    componentDidMount() {
        const { match: { params: { name } } } = this.props;

        if (name) {
            this.props.userFollowerRequest(name);
        } else {
            const token = getTokenFromLocalStorage();

            this.props.userRequest(token);
        }
    };

    componentWillReceiveProps(nextProps) {
        const { match: { params: { name } } } = this.props;
        const { match: { params: { name: nextName } } } = nextProps;
        if (name !== nextName) {
            if (nextName === undefined) {
                const token = getTokenFromLocalStorage();

                this.props.userRequest(token);
            } else {
                this.props.userFollowerRequest(nextName);
            }
        }
    }

    render() {
        const { userIsFetched, userIsFetching } = this.props;

        if (userIsFetching) {
            return (
                <Loader isLoading={true}/>
            )
        }

        if (!userIsFetched) {
            return (
                <Error
                    isError={true}
                    errorText={'Пользователь не найден!!'}/>
            );
        }

        const { login, id, avatar_url, followers, public_repos } = this.props.user;

        return (
            <div>
                <div className="app-user">
                    <div className="app-user__photo">
                        <img src={avatar_url} alt={login}/>
                    </div>
                    <div className="app__user-description">
                        <h3 className="app-user__login">Login: {login}</h3>
                        <p className="app-user__text app-user__followers">Followers: {followers}</p>
                        <p className="app-user__text">Public repositories: {public_repos}</p>
                    </div>
                </div>
                <Followers
                    key={id}
                    login={login}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: getUser(state),
    userIsFetching: getUserIsFetching(state),
    userIsFetched: getUserIsFetched(state),
    userError: getUserError(state)
});

const mapDispatchToProps = { userRequest, userFollowerRequest };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPage);