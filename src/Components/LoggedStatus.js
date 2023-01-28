import React from 'react';
import LoggedInUser from './LoggedInUser';
import LoggedOutUser from './LoggedOutUser';

function LoggedStatus(props) {

    if (props.loginID === '') {
        return <LoggedOutUser setLoginID={props.setLoginID} fetchLoginHandler={props.fetchLoginHandler} />;
    } else 
    return <LoggedInUser loginID={props.loginID} setLoginID={props.setLoginID} setUserJson={props.setUserJson} />;
}

export default LoggedStatus;