import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
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
  const [userType, setUserType] = useState();
  const [user, setUser] = useState();
  const [userAuthenticationData] = useAuthState(auth);

  // useEffect(() => {
  //     auth.signOut();
  //     setUser();
  // }, []);
  
  return (
    <div className="LoginPage">
      {userAuthenticationData
       ? <WelcomePage
         user={user}
         setUser={setUser}
         userType={userType}
         auth={auth}
         userAuthenticationData={userAuthenticationData} />
       : <SignIn setUserType={setUserType} />}
    </div>
  )
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
