import React, { useEffect, useState } from 'react';
import axios from "axios";

function Reservation({isCustomer,userUuid,setIsDefault}) {

  const [reservation,setReservation]=useState()
  const reservations=[]

  const clickHandler = ()=>{
    
    console.log(isCustomer,reservations)
   
    setIsDefault(true)
  }
  const clickHandler2 = ()=>{
    
    
    setReservation(reservations)
    
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
      
      userUuid.forEach(async(id)=>{
        await axios.get(`http://localhost:5000/api/reservations/${id}`).then(d=>{
          console.log(d.data)
          if(d.data.length!==0) reservations.push(d.data)
          
        }) 
      })
      
    }
  }




  React.useEffect(() => {
    getReservation()

  }, []);

  return (
    <div>
      <div>Reservations here</div> 
      
      
      <div>{JSON.stringify(reservation)}</div>
      <button onClick={clickHandler2}>リスト取得</button>
      <button onClick={clickHandler}>もどる</button>
    </div>
  );
}

export default Reservation;