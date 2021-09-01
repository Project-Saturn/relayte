import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoChat from './VideoChat';
import Reservations from './Reservations'
import axios from 'axios';
require('dotenv').config();

function WelcomePage(props) {
  const {
    user,
    setUser,
    userType,
    auth,
    userAuthenticationData
  } = props;
  const [roomID, setRoomID] = useState();

  async function lookupUserFromGoogleId() {
    try {
      const existingUser = (await axios.get(`/api/${userType}s/google/${userAuthenticationData.providerData[0].uid}`)).data
      if (existingUser.length) {
        setUser(existingUser[0]);
      } else {
        const newUser = {}
        newUser[userType] = {
          'name': userAuthenticationData.displayName,
          'google_id': userAuthenticationData.providerData[0].uid,
          'email': userAuthenticationData.email,
          'phone': userAuthenticationData.phoneNumber
        }
        
        if (userType === 'translator'){
          const price = await prompt('Please enter your cost per hour (Numbers only)');
          const languages = await prompt('Please enter the languages you can translate to/from separated by spaces');
          const priceNum = Number(price);
          const languagesArr = languages.split(' ');
          newUser[userType].price = priceNum;
          newUser[userType].languages = languagesArr;
        }

        const newUserId = (await axios.post(`/api/${userType}s/`, newUser)).data.id;

        const newUserData = (await axios.get(`/api/${userType}s/${newUserId}`)).data[0];
        setUser(newUserData);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  function signOut() {
    auth.signOut();
    setUser();
  }

  useEffect(() => {
    lookupUserFromGoogleId();
  }, []);

  return (
    <div className='WelcomePage'>
      <button onClick={() => auth.signOut()}>Sign Out</button>
      {roomID
        ? <VideoChat guestName={user.name} guestRoom={roomID} setRoomID={setRoomID} />
        : <div className='reservations'>
          {user
            ? <Reservations 
              userType={userType}
              user={user}
              setUser={setUser}
              joinVideoChat={joinVideoChat}
            />
            : <h2>Loading</h2>
          }
          
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
