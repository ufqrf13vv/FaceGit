import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class Follower extends PureComponent {

    render() {
        const { login, avatar } = this.props;

        return (
            <div className="app__follower">
                <Link className="app__follower-login" to={`/user/${login}`}>{login}</Link>
                <div className="app__follower-image">
                    <img src={avatar} alt={login}/>
                </div>
            </div>
        )
    }
}