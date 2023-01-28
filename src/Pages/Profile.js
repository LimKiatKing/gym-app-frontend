import React, { useState, useEffect } from 'react';
import FriendList from '../Components/FriendList';

function Profile(props) {

    const [currCredit, setCurrCredit] = useState('');

    const creditHandler = (event) => {
        event.preventDefault();
        if (currCredit < 999) {
            console.log("Top up credit");

            const requestOptions = {
                method: 'PUT',
                credentials: 'include',
                Connection: 'keep-alive',
            };

            fetch("http://localhost:8080/purchase-credit/100", requestOptions).then(async response => {
                // setPassStatusMsg(await response.text());
                console.log(await response.text());
                setCurrCredit(currCredit + 100);

                return response;
            })
        } else {
            console.log("Too much money");
        }
    }

    useEffect(() => {
        //to reload home page
        props.reloadHandler();
        setCurrCredit(props.userJson.credit);
    }, []);

    return (
        <section id='profile' className='page'>
            <div>
                <h1>PROFILE</h1>
                <div id='user-profile' className='card'>
                    <div className='profile-content'>
                        <div>Name: {props.userJson.name}</div>
                        <div>Gender: {props.userJson.gender}</div>
                    </div>
                    <div className='profile-content'>
                        <div>Credit Balance: {currCredit}</div>
                        <div><button onClick={creditHandler}>Top up</button></div>
                    </div>
                </div>
            </div>

            <div>
                <h1>Gym Passes</h1>
                {props.userJson.gym_passes.length === 0 && <p>No gym pass currently</p>}
                {props.userJson.gym_passes.length !== 0 && <table border="1" className='table'>
                    <tbody>
                        <tr>
                            <th>Gym</th>
                            <th>Expiry Date</th>
                            <th>Quantity</th>
                        </tr>
                        {props.userJson.gym_passes?.map((item, i) => (
                            <tr key={i}>
                                <td>{item.gym.gym_name}</td>
                                <td>{item.expiry_date}</td>
                                <td>{item.balance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>
            <div>
                <h1>Friends List</h1>
                <FriendList friendJson={props.friendJson} pending1Json={props.pending1Json} pending2Json={props.pending2Json} />
            </div>
        </section >
    )
}

export default Profile;