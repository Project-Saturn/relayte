import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoChat from './VideoChat';
import Reservations from './Reservations'
require('dotenv').config();

function WelcomePage(props) {
  const { user, setUser, userType, auth } = props;
  const [roomID, setRoomID] = useState();

  return (
    <div className='WelcomePage'>
      <button onClick={() => auth.signOut()}>Sign Out</button>
      {roomID
        ? <VideoChat guestName={user.name} guestRoom={roomID} setRoomID={setRoomID} />
        : <div className='reservations'>
          <Reservations 
            userType={userType}
            user={user}
            setUser={setUser}
            joinVideoChat={joinVideoChat}
          />
        </div>
      }
    </div>
  );
  
  function joinVideoChat(e) {
    const id = e.target.parentElement.parentElement.parentElement.id;
    setRoomID(id);
  }
}

export default WelcomePage;
