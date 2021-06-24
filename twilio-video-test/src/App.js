// import './App.css';

import React, { Component, useState } from 'react';
import './App.scss';
import axios from 'axios';
// import { render } from '@testing-library/react';
import Room from './Room';
const { connect } = require('twilio-video');

// const { connect, createLocalTracks } = require('twilio-video');
// const getToken = async () => {
//   const newToken = await axios.get('http://localhost:5000/api/testtwilio');
//   console.log(newToken);
//   return newToken;
// }
// const token = getToken();
// console.log('token');
// console.log(token);
// connect('', {
//   audio: true,
//   name: 'DailyStandup',
//   video: { width: 640 }
// })
// .then(room => {
//   console.log(`Successfully joined a Room: ${room}`);
//   room.on('participantConnected', participant => {
//     console.log(`A remote Participant connected: ${participant}`);
//   });
// }, error => {
//   console.error(`Unable to connect to Room: ${error.message}`);
// });


function App() {
  const [identity, setIdentity] = useState('');
  const [room, setRoom] = useState(null);
  // const [inputRef, setInputRef] = useState(React.createRef());
  const inputRef = React.createRef();

  const joinRoom = async () => {
    try {
      // const accessToken = await fetch(`http://localhost:5000/?identity=${identity}`);
      // const accessToken = await axios.get(`http://localhost:5000/api/token/?identity=${identity}`);
      const accessToken = await axios.get(`http://localhost:5000/api/token/testroom/${identity}`);
      const data = accessToken.data;
      const room = await connect(data, {
        name: 'DailyStandup',
        audio: true,
        video: true
      });
      setRoom(room);
    } catch (error) {
      console.log(error.message);
    }
  };

  const returnToLobby = () => {
    setRoom(null);
  };

  // const render = () => {
    const disabled = identity === '' ? true : false;
    return (
      <div className="app">
        {
          room === null
            ? <div className="lobby">
              <input
                value={identity}
                onChange={e => setIdentity(e.target.value)}
                ref={inputRef}
                onClick={e => e.target.placeholder = ''}
                placeholder="What's your name?" />
              <button disabled={disabled} onClick={joinRoom}>Join Room</button>
            </div>
            : <Room returnToLobby={returnToLobby} room={room} />
        }
      </div>
    );
  // };


  // return (
  //   <div className="room">
  //     <h1>My Room</h1>
  //   </div>
  // );
}

export default App;
