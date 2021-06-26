// import './App.css';
// import React, { useEffect, useState } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';
// import { useAuthState } from 'react-firebase-hooks/auth';
// require('dotenv').config();

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

// function FireBaseAuth() {
//     const [login, setLogin] = useState(false)
//     const [isCustomer, setIsCustomer] = useState(true)
//     const [priceAndLanguage, setPriceAndLanguage] = useState(false)
  
//     const [user] = useAuthState(auth);
//     function SignIn() {
//         const signInWithGoogle = () => {
//             const provider = new firebase.auth.GoogleAuthProvider();
//             auth.signInWithPopup(provider);
//         }
    
//         return (
//             console.log(user)
//             //   <button onClick={signInWithGoogle}>Sign in with Google</button>
//         );
//     }
// }
//    // console.log(user)
    
//   // const getPriceAndLanguage = () =>{
//     // get  api/translator/:id 
//     // price !== null && language !== null -> setPriceAndLanguage(true)
//   // }






// export default FireBaseAuth;