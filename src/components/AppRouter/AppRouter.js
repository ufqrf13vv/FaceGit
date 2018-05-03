import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, getIsAuthorized } from '../../ducks/auth';
import { getNetworkError } from '../../ducks/network';
//  Components
import Login from '../Login';
import UserPage from '../UserPage';
import PrivateRoute from '../PrivateRoute';

export class AppRouter extends Component {

    handleLogout = () => {
        this.props.logout();
    };

    render() {
        const { isAuthorized, networkError } = this.props;

        if (networkError) {
            return <p className="error">Ошибка: {networkError}</p>;
        }

        return (
            <div className="app">
                {isAuthorized && (
                    <div className="app__header">
                        <button
                            className="app__button"
                            onClick={this.handleLogout}>
                            Logout
                        </button>
                    </div>
                )}
                <Switch>
                    <PrivateRoute path="/user/me" exact component={UserPage} />
                    <PrivateRoute path="/user/:name" component={UserPage} />
                    <Route path="/login" exact component={Login} />
                    <Redirect to="/user/me" />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthorized: getIsAuthorized(state),
    networkError: getNetworkError(state)
});

const mapDispatchToProps = { logout };

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AppRouter)
);