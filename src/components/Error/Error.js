import React, { Fragment } from 'react';

const Error = ({isError, errorText}) => {

    return (
        <Fragment>
            {isError && <p className="search__error">{errorText}</p>}
        </Fragment>
    )
};

export default Error;