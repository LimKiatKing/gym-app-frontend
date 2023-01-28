import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Moment from 'moment';
import Timeslot from '../Components/Timeslot';
import 'react-calendar/dist/Calendar.css';


function Book(props) {

    const [gymDetail, setGymDetail] = useState('');
    const [bookStatusMsg, setBookStatusMsg] = useState('');
    const [passStatusMsg, setPassStatusMsg] = useState('');
    const [timeslotJson, setTimeslotJson] = useState('');
    const [date, setDate] = useState(new Date());

    const displayHandler = (event) => {
        setGymDetail(event.target.value);
        console.log(gymDetail);
    }

    const purchaseHandler = (event) => {
        event.preventDefault();
        if (gymDetail.length !== 0) {
            console.log("Purchase from: " + gymDetail);

            const requestOptions = {
                method: 'POST',
                credentials: 'include',
                Connection: 'keep-alive',
              };

            fetch("http://localhost:8080/purchase-pass/" + gymDetail, requestOptions).then(async response => {
                setPassStatusMsg(await response.text());
                return response;
            })
        } else {
            console.log("no gym selected");
            setPassStatusMsg("No gym selected");
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (gymDetail.length !== 0) {
            console.log("submit view schedule for ID: " + gymDetail + " Date: " + Moment(date).format('YYYY-MM-DD'));
            
            const requestOptions = {
                credentials: 'include',
                Connection: 'keep-alive',
              };
            
            fetch("http://localhost:8080/view-schedule/" + gymDetail + "/" + Moment(date).format('YYYY-MM-DD'), requestOptions).then(response => {
                return response.json();
            }).then(data => { 
                setTimeslotJson(data);
                if (data.length === 0) { 
                    setBookStatusMsg("No available slot for the selected gym and date");
                }
            })

        } else {
            setBookStatusMsg("No gym selected");
        }
    }

    useEffect(() => {
        setTimeslotJson('');
        setBookStatusMsg('');
        setPassStatusMsg('');
    }, [gymDetail, date]);

    return (
        <div className="page">
            <h1>BOOK</h1>
            <form onSubmit={submitHandler}>
                <select onChange={displayHandler}>
                    <option value="" hidden>Select Gym</option>
                    {props.gymJson?.map((item, i) => (
                        <option key={i} value={item.gym_id}>{item.gym_name}, Price: {item.pass_price}</option>
                    ))}
                </select>
                <button onClick={purchaseHandler}>Purchase Pass</button>
                <p>{passStatusMsg}</p>

                <div className='calendar-container'>
                    <Calendar onChange={setDate} value={date} minDate={new Date()} />
                </div>
                <p className='text-center'>
                    <span className='bold'>Selected Date:</span>{' '}
                    {Moment(date).format('DD-MM-YYYY')}
                </p>

                <button type="submit">View Schedule</button>
            </form>
            <div className='book-status'>
            <p>{bookStatusMsg}</p>
            </div>
            <Timeslot timeslotJson={timeslotJson} submitHandler={submitHandler} setBookStatusMsg={setBookStatusMsg} />
        </div>
    )
}

export default Book;