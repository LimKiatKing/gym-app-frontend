import react from "react";

function LoggedInUser(props) {

    const logOutHandler = (event) => {
        event.preventDefault();
        // console.log("from submit handler" + newUser);
        props.setLoginID('');
        props.setUserJson('');
    
        const requestOptions = {
            Connection: 'close',
        };
        fetch("http://localhost:8080/logout/", requestOptions).then(response => {
            return response;
        });
        console.log('logout');
    }

    return (
        <div className='login'>
            <p>Welcome, <br/> ID: {props.loginID}</p>
            <button type='submit' name="LogOut" value="" onClick={logOutHandler}>Log Out</button>

        </div>
    );
}

export default LoggedInUser;