import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import Nav from './Components/Nav';
import Home from './Pages/Home';
import Book from './Pages/Book';
import Profile from './Pages/Profile';

function App() {

  const [loginID, setLoginID] = useState('');
  const [userJson, setUserJson] = useState('');
  const [gymJson, setGymJson] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [friendJson, setFriendJson] = useState([]);
  const [pending1Json, setPending1Json] = useState([]);
  const [pending2Json, setPending2Json] = useState([]);
  const navigate = useNavigate();

  // const [user, setUser] = useState('');
  // const [errorState, setErrorState] = useState(null);

  const fetchLoginHandler = (loginID) => {

    const requestOptions = {
      credentials: 'include',
      Connection: 'keep-alive',
    };

    fetch("http://localhost:8080/login/" + loginID, requestOptions).then(response => {
      if (response.ok) {
        setLoginStatus('');
        return response.json();
      } else {
        return null;
      }
    }).then(async data => {
      if (await data === null) {
        setLoginID('');
        setLoginStatus('Invalid Login');

      } else {
        setUserJson(data);
      }
    })
    navigate("/Home");
  };

  const reloadHandler = () => {

    const requestOptions = {
      credentials: 'include',
      Connection: 'keep-alive',
    };

    fetch("http://localhost:8080/reload-user/", requestOptions).then(response => {
      return response.json();
    }).then(data => {
      if (data === null) {
        setLoginID('');
        console.log('no data');
      } else {
        setUserJson(data);
      }
    })
  }

  //Generate gym and friend list upon login
  useEffect(() => {
    if (userJson.length !== 0) {

      fetch("http://localhost:8080/gym/").then(response => {
        return response.json();
      }).then(data => {
        setGymJson(data)
      })

      const requestOptions = {
        credentials: 'include',
        Connection: 'keep-alive',
      };

      fetch("http://localhost:8080/generate-Friendlist/A", requestOptions).then(response => {
        return response.json();
      }).then(data => {
        setFriendJson(data)
      })

      fetch("http://localhost:8080/generate-Friendlist/P1", requestOptions).then(response => {
        return response.json();
      }).then(data => {
        setPending1Json(data)
      })

      fetch("http://localhost:8080/generate-Friendlist/P2", requestOptions).then(response => {
        return response.json();
      }).then(data => {
        setPending2Json(data)
      })
      // console.log(friendJson);
      // console.log(pending1Json);
      // console.log(pending2Json);
    }
  }, [userJson]);

  if (userJson.length === 0) {
    return (
      <div className="App">
        <header>
          <Nav fetchLoginHandler={fetchLoginHandler} setUserJson={setUserJson} loginID={loginID} setLoginID={setLoginID} />

        </header>
        <p>Login to view details</p>
        {loginStatus}

        <footer className="bottom-banner" />
      </div>
    )
  } else {

    return (
      <div className="App">
        <header>
          <Nav fetchLoginHandler={fetchLoginHandler} setUserJson={setUserJson} loginID={loginID} setLoginID={setLoginID} />
        </header>

        <section>
          <Routes>
            <Route path="/" exact element={<Navigate to="/Home" />}>
            </Route>
            <Route path="/Home" element={<Home userJson={userJson} setUserJson={setUserJson} reloadHandler={reloadHandler} />}>
            </Route>
            <Route path="/Book" exact element={<Book userJson={userJson} gymJson={gymJson} />}>
            </Route>
            <Route path="/Profile" exact element={<Profile userJson={userJson} friendJson={friendJson} pending1Json={pending1Json} pending2Json={pending2Json} reloadHandler={reloadHandler} />}>
            </Route>
          </Routes>
        </section>

        <footer className="bottom-banner" />
      </div>
    );
  }
}

export default App;
