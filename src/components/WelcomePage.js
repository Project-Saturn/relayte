import React, { useState, useEffect } from 'react';
import axios from 'axios'
require('dotenv').config();

function WelcomePage(props) {
  // const { userType, userAuthenticationData, googleID, auth } = props;
  const { user, userType, auth } = props;
  // const [user, setUser] = useState()
  useEffect(() => {
    //Get user info
    // lookupUserFromGoogleId();
  }, [])

  return (
    <div className="WelcomePage">
      <button onClick={() => auth.signOut()}>Sign Out</button>


    </div>
  );


  // async function lookupUserFromGoogleId() {
  //   try {
  //     const existingUser = (await axios.get(`/api/${userType}s/google/${googleID}`)).data
  //     if (existingUser.length) {
  //       setUser(existingUser[0]);
  //     } else {
  //       const newUser = {}
  //       newUser[userType] = {
  //         'name': userAuthenticationData.displayName,
  //         'google_id': userAuthenticationData.providerData[0].uid,
  //         'email': userAuthenticationData.email,
  //         'phone': userAuthenticationData.phoneNumber
  //       }

  //       if (userType === 'translator'){
  //         const price = await prompt('Please enter your cost per hour (Numbers only)');
  //         const languages = await prompt('Please enter the languages you can translate to/from separated by spaces');
  //         const priceNum = Number(price);
  //         const languagesArr = languages.split(' ');
  //         newUser[userType].price = priceNum;
  //         newUser[userType].languages = languagesArr;
  //       }

  //       const newUserId = (await axios.post(`/api/${userType}s/`, newUser)).data.id;

  //       const newUserData = (await axios.get(`/api/${userType}s/${newUserId}`)).data[0];
  //       setUser(newUserData);
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // }
}


export default WelcomePage;
