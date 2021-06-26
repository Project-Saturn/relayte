import './App.css';
import Customer from './Customer';
import Translator from './Translator';
import Login from './Login';
import SetPriceAndLanguage from './SetPriceAndLanguage';
import React, { useEffect, useState } from 'react';
import loggedInUser from './context';
import { trueFunc } from 'boolbase';
import { auth } from './Login'

// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';
// import { useAuthState } from 'react-firebase-hooks/auth';
//require('dotenv').config();

// firebase.initializeApp({
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID
// });
// const auth = firebase.auth();
// const firestore = firebase.firestore();

function App() {
  const[login,setLogin] = useState(false)
  const[isCustomer,setIsCustomer] = useState(true)
  const[priceAndLanguage,setPriceAndLanguage] = useState(false)
  
  // const [user] = useAuthState(auth);
  // function SignIn() {
  //   const signInWithGoogle = () => {
  //     const provider = new firebase.auth.GoogleAuthProvider();
  //     auth.signInWithPopup(provider);
  //   }
    
  //   return(
  //     <button onClick={signInWithGoogle}>Sign in with Google</button>
  //     );
  //   }
  //   console.log(user)
    
  // const getPriceAndLanguage = () =>{
    // get  api/translator/:id 
    // price !== null && language !== null -> setPriceAndLanguage(true)
  // }




  return (
    <div className="App">
      <header className="App-header">

        <button onClick={() => { auth.signOut() }}>Sign Out</button>
        {login === false ?(
        <Login 
          setLogin={setLogin}
          login={login}  
          setIsCustomer={setIsCustomer}
        />) 
        : (
          <div>
            {isCustomer === true ?(
              <Customer />)
              : (
                <div>
                  {priceAndLanguage === false ?(
                    <div>
                      <SetPriceAndLanguage setPriceAndLanguage={setPriceAndLanguage} />
                    </div>
                  ):(
                    <Translator/>
                  )}
                  
                </div>  
              )}


          </div>
        )}
      </header>
    </div>
  );
}

export default App;