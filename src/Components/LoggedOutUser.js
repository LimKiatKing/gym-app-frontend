import React, { useState } from 'react';

function LoggedOutUser(props) {

    const [newUser, setNewUser] = useState('');

    const userChangeHandler = (event) => {
        setNewUser(event.target.value);
        // console.log("from change handler" + newUser);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        // console.log("from submit handler" + newUser);
        if (newUser.length !== 0) {
            props.setLoginID(newUser);
            props.fetchLoginHandler(newUser);
            setNewUser('');
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler} className='login'>
                <input type="number" name="login" value={newUser} min='1' max='9999999' placeholder="User ID" onChange={userChangeHandler} />
                {/* id="login" */}
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}

export default LoggedOutUser;