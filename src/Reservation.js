import React, { useEffect, useState } from 'react';
import axios from "axios";

function Reservation({isCustomer,userUuid,setIsDefault}) {

  
  const reservations=[]

  const clickHandler = ()=>{
    if(isCustomer) console.log(userUuid)
    console.log(isCustomer,reservations)
    // setIsDefault(true)
  }

  const getReservation = async ()=>{
    if(isCustomer){
      userUuid.forEach(async(id)=>{
        await axios.get(`http://localhost:5000/api/reservations/${id}`).then(d=>{
          reservations.push(d.data)
        }) 
      })
    }else{
      //translatorのreservations表示
    }
  }




  React.useEffect(() => {
    getReservation()

  }, []);

  return (
    <div>
      <div>Reservations here</div> 
      <div>get   /api/reservation/:id</div>
      
      
      <button onClick={clickHandler}>もどる</button>
    </div>
  );
}

export default Reservation;