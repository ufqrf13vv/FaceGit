import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getIsAuthorized, authRequest } from '../../ducks/auth';

class Login extends Component {

    handleOnChange = event => {
        const { value } = event.target;

        this.setState({token: value});
    };

    handleKeyPress = event => {
        if (event.key === 'Enter') {
            const { token } = this.state;

            this.props.authRequest(token);
        }
    };

    render() {
        const { isAuthorized } = this.props;

        if (isAuthorized) {
            return <Redirect to="/user/me" />;
        }

        return (
            <div className="app__login">
                <h2 className="app-title">Введите токен</h2>
                <input
                    className="app__input"
                    type="text"
                    onChange={this.handleOnChange}
                    onKeyPress={this.handleKeyPress}
                    placeholder="access token"/>
                <pre className="app__note">* после ввода нажмите enter</pre>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthorized: getIsAuthorized(state)
});

const mapDispatchToProps = { authRequest };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);