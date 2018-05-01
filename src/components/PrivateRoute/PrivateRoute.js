import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getTokenFromLocalStorage } from '../../localStorage';

export default class PrivateRoute extends PureComponent {

    render() {
        const { component: Component, ...rest } = this.props;
        const token = getTokenFromLocalStorage();

        return (
            <Route
                {...rest}
                render={props =>token ?
                <Component {...props} /> :
                <Redirect to="/login" /> }
            />
        );
    }
}