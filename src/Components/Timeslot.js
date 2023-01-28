import React from 'react';

function Timeslot(props) {

    // const [friendSlot, setFriendSlot] = useState([]);

    const bookingHandler = (event) => {
        console.log("booking for slot_id: " + event.target.value);

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            Connection: 'keep-alive',
        };

        fetch("http://localhost:8080/book/" + event.target.value, requestOptions).then(async response => {
            // console.log("msg is: " + await response.text());
            props.setBookStatusMsg(await response.text());
            if (response.ok) {
                event.target.disabled = true;
            }
            return response;
        })


    }

    // const showFriendHandler = (event) => {
    //     console.log("showing friend for slot_id: " + event.target.value);

    //     // fetch("http://localhost:8080/friend-slot/" + event.target.value).then(response => {
    //     //     return response.json();
    //     // }).then(data => { setFriendSlot(data) })
    //     // console.log(friendSlot);
    // }

    if (props.timeslotJson.length === 0) {
        return;
    }

    return (
        <section className='timeslot'>
            {props.timeslotJson?.map((item, i) => {
                if (!item.isBooked) {
                    return (
                        <div key={i} className='card'>
                            <div className='card-content'>
                                Slot: {item.slot_number} <br />
                                {item.description}</div>
                            <div className='card-content'>
                                <button onClick={bookingHandler} value={item.slot_id}>Book</button></div>
                            {item?.slotFriends.map((item1, j) => {
                                <div key={j}>
                                    {item1.j}<br />
                                </div>
                            })}
                        </div>
                    )
                } else {
                    return (
                        <div key={i} className='card'>
                            <div className='card-content'>
                                Slot: {item.slot_number} <br />
                                {item.description} </div>
                            {/* <button onClick={showFriendHandler} value={item.slot_id}>Show Friends</button> */}
                            <div className='card-content'>
                                <button disabled>Booked</button></div>

                            {item?.slotFriends.map((item1, j) => {
                                <div key={j}>
                                    {item1}<br />
                                </div>
                            })}

                        </div>

                    )
                }
            })}

        </section>
    )

}
export default Timeslot;