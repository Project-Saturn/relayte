import './App.css';
import React, { useEffect, useState } from 'react';
import VideoChat from './components/VideoChat';
import LoginPage from './components/LogInPage';

require('dotenv').config();


function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const [guestRoom, setGuestRoom] = useState('');
  const [guestName, setGuestName] = useState('');

  useEffect(async () => {
    await setGuestRoom(queryParams.get('guestRoom'));
    await setGuestName(queryParams.get('guestName'));
  }, []);

  return (
    <div className="App">
      {guestRoom
        ? <VideoChat guestName={guestName} guestRoom={guestRoom} />
        : <LoginPage />}
    </div>
  );
}

export default App;
