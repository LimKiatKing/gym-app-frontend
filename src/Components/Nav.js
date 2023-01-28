import React from 'react';
import './Nav.css';
import { NavLink } from "react-router-dom";
import LoggedStatus from './LoggedStatus';



function Nav(props) {

    return (
        <div className='top-banner'>
            <div className='nav-content'>
                <h1>Gym App</h1>
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/Home" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Home</NavLink></li>
                            <li><NavLink to="/Book" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Book</NavLink></li>
                            <li><NavLink to="/Profile" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Profile</NavLink></li>
                        </ul>
                    </nav>
                </header>
            </div>
            <LoggedStatus fetchLoginHandler={props.fetchLoginHandler} setUserJson={props.setUserJson} loginID={props.loginID} setLoginID={props.setLoginID} />
        </div>
    )
}

export default Nav;
