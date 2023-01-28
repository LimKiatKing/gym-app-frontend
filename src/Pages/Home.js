import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import UserButton from '../Components/UserButton';

function Home(props) {
    const [searchUser, setSearchUser] = useState('');
    const [userData, setUserData] = useState('');
    const [statusMsg, setStatusMsg] = useState('');
    const [searchIsValid, setSearchIsValid] = useState(false);
    // const [searchUserTouched, setSearchUserTouched] = useState(false);
    // const userInputIsInvalid = !searchIsValid && searchUserTouched;

    const userChangeHandler = (event) => {
        setSearchUser(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        // setSearchUserTouched(true);
        setUserData('');
        setStatusMsg('');
        setSearchIsValid(true);
        fetchUserHandler(searchUser);

        // if (searchUser.length != 0) {
        //     setSearchIsValid(true);
        //     fetchUserHandler(searchUser);
        // } else {
        //     setSearchIsValid(false);
        //     console.log("not a number");
        // }
        setSearchUser('');
    }

    const fetchUserHandler = (searchUser) => {

        const requestOptions = {
            credentials: 'include',
            Connection: 'keep-alive',
        };

        fetch("http://localhost:8080/user/" + searchUser, requestOptions).then(async response => {
            if (!response.ok) {
                // console.log(await response.text());
                setStatusMsg(await response.text());
                setSearchIsValid(false);
                return response;
            } else {
                return response.json();
            }
        }).then(data => { setUserData(data) })
    };

    //to reload home page
    useEffect(() => {
        // console.log('use effect reload data');
        props.reloadHandler();
    }, []);

    return (
        <section className="page">
            <h1>HOME</h1>
            <p>Bookings</p>
            {props.userJson.bookings?.map((item, i) => (
                <div key={i} className="card">
                    <div className="card-content">{Moment(item.timeslot.slot_date).format('DD-MMM')}<br />
                        Slot: {item.timeslot.slot_number}</div>
                    <div className="card-content">{item.timeslot.gym.gym_name}</div>
                    <div className="card-content">{item.timeslot.description}</div>
                </div>

            ))}

            <form onSubmit={submitHandler} className='search-bar'>
                {/* <input type="text" value={searchUser} maxLength="4" size="4" onChange={userChangeHandler} placeholder="User ID" /><br/> */}
                <input type="number" value={searchUser} min="1" max="9999999" required onChange={userChangeHandler} placeholder="User ID" /><br />
                <button type='submit'>Search</button>
            </form>
            {/* <div>{userInputIsInvalid && <p>User ID is invalid</p>}</div> */}

            {searchIsValid && <div className="card">
                <div className="card-content">{userData.user_id}</div>
                <div className="card-content">{userData.name}</div>
                <div className="card-content">{userData.gender}</div>
                <div className="card-content">{statusMsg.length === 0 && <UserButton userData={userData} setStatusMsg={setStatusMsg} />}</div>
            </div>}
            <p>{statusMsg}</p>
        </section>
    )
}

export default Home;