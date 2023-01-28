import React, { useState } from 'react';

function UserButton(props) {

    const requestHandler = (event) => {
        console.log("add user_id: " + event.target.value);
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' }
        // };

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            Connection: 'keep-alive',
          };

        fetch("http://localhost:8080/friend-request/" + event.target.value, requestOptions).then(async response => {    
        // console.log("msg is: " + await response.text());
        props.setStatusMsg(await response.text());
            if (response.ok) {
                event.target.disabled = true;
            }
            return response;
        })
    }

    const acceptHandler = (event) => {
        console.log("accept user_id: " + event.target.value);
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' }
        // };

        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            Connection: 'keep-alive',
          };

        fetch("http://localhost:8080/friend-accept/" + event.target.value, requestOptions).then(async response => {
            // console.log(response);
            // console.log("msg is: " + await response.text());
            props.setStatusMsg(await response.text());
            if (!response.ok) {
            } else {
                event.target.disabled = true;
            }
            return response;
        })
    }

    if (props.userData.length !== 0) {
        if (props.userData.status_code === 'A') {
            return (
                <div>
                    <button disabled>Friend</button>
                </div>
            )
        } else if (props.userData.status_code === 'R') {
            return (
                <div>
                    <button disabled>Requested</button>
                </div>
            )
        } else if (props.userData.status_code === 'F') {
            return (
                <div>
                    <button onClick={acceptHandler} value={props.userData.user_id}>Accept</button>
                </div>
            )
        } else {
            return (
                <div>
                    <button onClick={requestHandler} value={props.userData.user_id}>Add Friend</button>
                </div>
            )
        }
    }
}
export default UserButton;