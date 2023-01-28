import React from 'react';

function FriendList(props) {

    const acceptHandler = (event) => {
        console.log("accept user_id: " + event.target.value);
        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            Connection: 'keep-alive',
        };
        fetch("http://localhost:8080/friend-accept/" + event.target.value, requestOptions).then(async response => {
            // console.log(response);
            console.log("msg is: " + await response.text());
            // props.setStatusMsg(await response.text());
            if (!response.ok) {
            } else {
                event.target.disabled = true;
            }
            return response;
        })
    }


    return (
        <div>
            {props.friendJson?.map((item, i) => (
                <div key={i} className='card'>
                    <div className='card-content'>{item.name}<br />
                        {item.user_id}<br /></div>
                    <div className='card-content'>{item.gender}</div>
                    <div className='card-content'><button disabled>Friend</button></div>
                </div>
            ))}

            {props.pending1Json?.map((item, i) => {
                if (item.status_code === 'F') {
                    return (
                        <div key={i} className='card'>
                            <div className='card-content'>{item.name}<br />
                                {item.user_id}<br /></div>
                            <div className='card-content'>{item.gender}</div>
                            <div className='card-content'><button onClick={acceptHandler} value={item.user_id}>Accept</button></div>
                        </div>
                    )
                } else {
                    return (
                        <div key={i} className='card'>
                            <div className='card-content'>{item.name}<br />
                                {item.user_id}<br /></div>
                            <div className='card-content'>{item.gender}</div>
                            <div className='card-content'><button disabled>Pending</button></div>
                        </div>
                    )
                }
            })}

            {props.pending2Json?.map((item, i) => {
                if (item.status_code === 'F') {
                    return (
                        <div key={i} className='card'>
                            <div className='card-content'>{item.name}<br />
                                {item.user_id}<br /></div>
                            <div className='card-content'>{item.gender}</div>
                            <div className='card-content'><button onClick={acceptHandler} value={item.user_id}>Accept</button></div>
                        </div>
                    )
                } else {
                    return (
                        <div key={i} className='card'>
                            <div className='card-content'>{item.name}<br />
                                {item.user_id}<br /></div>
                            <div className='card-content'>{item.gender}</div>
                            <div className='card-content'><button disabled>Pending</button></div>
                        </div>
                    )
                }
            })}
        </div>
    )
}
export default FriendList;