import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import WelcomePage from './WelcomePage';

import { useAuthState } from 'react-firebase-hooks/auth';
require('dotenv').config();

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
});
const auth = firebase.auth();

function LogInPage() {
  const queryParams = new URLSearchParams(window.location.search);
  const [guestRoom, setGuestRoom] = useState(queryParams.get('guestRoom'));
  const [guestName, setGuestName] = useState(queryParams.get('guestName'));
  const [userType, setUserType] = useState();
  const [user, setUser] = useState();
  const [userAuthenticationData] = useAuthState(auth);

  useEffect(() => {
      lookupUserFromGoogleId();
      setUser();
  }, [userAuthenticationData])

  useEffect(() => {
      auth.signOut();
      setUser();
  }, []);
  
  return (
    <div className="LoginPage">
      {userAuthenticationData && user
       ? <WelcomePage
         user={user}
         setUser={setUser}
         userType={userType}
         auth={auth} />
       : <SignIn setUserType={setUserType} />}
    </div>
  )

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

}

function SignIn(props) {
  const {setUserType} = props;
  const signInWithGoogle = (e) => {
    setUserType(e.target.id);
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <div>
      <h1>Log In to Relayte</h1>
      <h2>Please select an option below</h2>
      <button id='customer' onClick={signInWithGoogle}>Sign in as a user</button>
      <button id='translator' onClick={signInWithGoogle}>Sign in as a translator</button>
    </div>
  ); 
}

export default LogInPage;