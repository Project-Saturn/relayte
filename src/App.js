import './App.css';
import Customer from './Customer';
import Translator from './Translator';
import Login from './Login';
import SetPriceAndLanguage from './SetPriceAndLanguage';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import axios from "axios"
import VideoChat from './components/VideoChat';

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
const firestore = firebase.firestore();

function App() {
  const[login,setLogin] = useState(false)
  const[isCustomer,setIsCustomer] = useState(true)
  const[priceAndLanguage,setPriceAndLanguage] = useState(false)
  const[uuid,setUuid] = useState("")
  const [user] = useAuthState(auth);

  const queryParams = new URLSearchParams(window.location.search);
  const [guestRoom, setGuestRoom] = useState(queryParams.get("guestRoom"));
  const [guestName, setGuestName] = useState(queryParams.get("guestName"));
  // const [username, setUsername] = useState(guestName ? guestName : "");
  // const [roomName, setRoomName] = useState(guestRoom ? guestRoom : "");


  function SignIn() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
    
    return(
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      );
    }
    // console.log(user)
  if (user)
  {
    // console.log(user.providerData[0].uid)// google ID
    // console.log(user.displayName) //displayName
    // console.log(user.email) //email
    // console.log(user.phoneNumber)
  }
      
  // const getPriceAndLanguage = () =>{
    // get  api/translator/:id 
    // price !== null && language !== null -> setPriceAndLanguage(true)
  // }

  const checkTranslator = async() =>{
    if(user){
      await axios.get(`http://localhost:5000/api/translators/google/${user.providerData[0].uid}`).then(d=>{
        
        if(d.data.length!==0) setPriceAndLanguage(true)
      })
      setUuid(user.providerData[0].uid)
    }
  }

  useEffect(()=>{
    checkTranslator()
  },[user])

  console.log("guest room " + guestRoom)
  console.log("user " + user)
  return (
    <div className="App">
      <header className="App-header">

        

        {/* {user ? <button onClick={() => auth.signOut()}>Sign Out</button> : <SignIn />} */}

        {/* {user!==null?( */}
        {guestRoom ? <VideoChat guestName={guestName} guestRoom={guestRoom} /> : user ? (
          <div>
            <button onClick={() => auth.signOut()}>Sign Out</button>
            {login === false ?(
                    <Login 
                      setLogin={setLogin} 
                      setIsCustomer={setIsCustomer}
                      user={user}
                    />) 
                    : (
                      <div>
                        {isCustomer === true ?(
                          <Customer 
                          isCustomer={isCustomer}
                          uuid={uuid}
                          />)
                          : (
                            <div>
                              {priceAndLanguage === false ?(
                                <div>
                                  <SetPriceAndLanguage 
                                  setPriceAndLanguage={setPriceAndLanguage} 
                                  user={user}
                                  />
                                </div>
                              ):(
                                <Translator 
                                uuid={uuid}
                                user={user}
                                />
                              )}
                          
                            </div>  
                          )}


                      </div>
                    )}
          </div>
          ):(
            // <div>

            // </div>
           <SignIn />
        )}


        


      </header>
    </div>
  );
}

export default App;
